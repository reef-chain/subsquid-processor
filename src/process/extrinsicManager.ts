import { BlockHeader, Event } from "@subsquid/substrate-processor";
import { ExtrinsicData } from "../interfaces/interfaces";
import { Block, Extrinsic, ExtrinsicStatus, ExtrinsicType } from "../model";
import { Fields, ctx } from "../processor";
import { getFeeDetails, getPaymentInfo } from "../util/extrinsic";
import { getDocs, getErrorMessage, hexToNativeAddress, toCamelCase } from "../util/util";
import { DataRawAddress } from "../util/interfaces";
import { EventRecord as EventRecordV5, SystemEvent_ExtrinsicSuccess as ExtrinsicSuccessV5 } from "../types/v5";
import { EventRecord as EventRecordV8, SystemEvent_ExtrinsicSuccess as ExtrinsicSuccessV8 } from "../types/v8";
import { EventRecord as EventRecordV10, SystemEvent_ExtrinsicSuccess as ExtrinsicSuccessV10 } from "../types/v10";

type EventRecord = EventRecordV5 | EventRecordV8 | EventRecordV10;
type SystemEvent_ExtrinsicSuccess = ExtrinsicSuccessV5 | ExtrinsicSuccessV8 | ExtrinsicSuccessV10;

export class ExtrinsicManager {  
    extrinsicsData: Map<string, ExtrinsicData> = new Map();
  
    async process(event: Event<Fields>): Promise<bigint> {
        if (this.extrinsicsData.has(event.extrinsic!.id)) return BigInt(0);

        let signer = "";
        let signedData = null;
        if (event.extrinsic?.signature?.address) {
            const addressHex = (event.extrinsic!.signature!.address as DataRawAddress).value;
            signer = hexToNativeAddress(addressHex);
            signedData = await this.getSignedData(event);
        }
            
        const [section, method] = event.extrinsic!.call!.name.split(".");

        let errorMessage = "";
        if (event.extrinsic?.error) {
            errorMessage = getErrorMessage(event.block._runtime, event.extrinsic!.error, section);
        }

        const docs = getDocs(event.block._runtime, section, method);

        event.block._runtime

        const extrinsicData = {
            id: event.extrinsic!.id,
            blockId: event.block.id,
            index: event.extrinsic!.index,
            hash: `${event.extrinsic!.hash}-${event.block.hash.substring(2, 7)}`,
            args: event.extrinsic!.call!.args ? Object.keys(event.extrinsic!.call!.args).map(key => event.extrinsic!.call!.args[key]) : [],
            docs: docs,
            method: toCamelCase(method),
            section: section,
            signer: signer,
            status: event.extrinsic!.success ? ExtrinsicStatus.success : ExtrinsicStatus.error,
            errorMessage: errorMessage,
            type: signer ? ExtrinsicType.signed : ExtrinsicType.unsigned,
            signedData: signedData,
            timestamp: new Date(event.block.timestamp!),
        };

        this.extrinsicsData.set(extrinsicData.id, extrinsicData);

        return extrinsicData.signedData?.fee.partialFee || BigInt(0);
    }
  
    async save(blocks: Map<string, Block>): Promise<Map<string, Extrinsic>> {
        const extrinsics: Map<string, Extrinsic> = new Map();
        
        this.extrinsicsData.forEach(extrinsicData => {
            const block = blocks.get(extrinsicData.blockId);
            if (!block) {
                ctx.log.error(`ERROR saving extrinsic: Block ${extrinsicData.blockId} not found`);
                return;
            }
            
            extrinsics.set(extrinsicData.id, new Extrinsic ({
                ...extrinsicData,
                block: block
            }));
        });
    
        await ctx.store.insert([...extrinsics.values()]);
    
        return extrinsics;
    }

    // https://substrate.stackexchange.com/questions/2637/determining-the-final-fee-from-a-client/4224#4224
    private async getSignedData(event: Event<Fields>) {
        const [fee, feeDetails, systemEvents] = await Promise.all([
            getPaymentInfo(event, event.block.parentHash),
            getFeeDetails(event, event.block.parentHash),
            this.getSystemEvents(event.block)
        ]);

        const baseFee = feeDetails.inclusionFee?.baseFee && BigInt(feeDetails.inclusionFee.baseFee) || BigInt(0);
        const lenFee = feeDetails.inclusionFee?.lenFee && BigInt(feeDetails.inclusionFee.lenFee) || BigInt(0);
        const adjustedWeightFee = feeDetails.inclusionFee?.adjustedWeightFee && BigInt(feeDetails.inclusionFee.adjustedWeightFee) || BigInt(0);
        const estimatedWeight: bigint = fee.weight && BigInt(fee.weight) || BigInt(0);
        const estimatedPartialFee = fee.partialFee && BigInt(fee.partialFee) || BigInt(0);

        fee.partialFee = estimatedPartialFee;
        feeDetails.inclusionFee.baseFee = baseFee;
        feeDetails.inclusionFee.lenFee = lenFee;
        feeDetails.inclusionFee.adjustedWeightFee = adjustedWeightFee

        if (systemEvents) {
            const successEvent = (systemEvents as EventRecord[]).find((systemEvent) =>
                systemEvent.phase.__kind === "ApplyExtrinsic" &&
                systemEvent.phase.value === event.extrinsic!.index &&
                systemEvent.event.value.__kind === "ExtrinsicSuccess"
            );

            if (successEvent) {
                const dispatchInfo = (successEvent.event.value as SystemEvent_ExtrinsicSuccess).value;
                if (dispatchInfo.paysFee.__kind === "Yes") {
                    const actualWeight = dispatchInfo.weight || BigInt(0);
                    fee.partialFee = baseFee + lenFee + ((adjustedWeightFee / estimatedWeight) * actualWeight);
                }
            }
        }

        return { fee, feeDetails };
    }

    private async getSystemEvents(blockHeader: BlockHeader<Fields>) {
        try {
            // For testnet System.Events is not found in metadata, so call getStorage directly
            return await blockHeader._runtime.getStorage(blockHeader.hash, 'System.Events');
        } catch (error) {
            return undefined;
        }
    }
}

  