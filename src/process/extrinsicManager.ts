import { Event } from "@subsquid/substrate-processor";
import { ExtrinsicData } from "../interfaces/interfaces";
import { Block, Extrinsic, ExtrinsicStatus, ExtrinsicType } from "../model";
import { Fields, ctx } from "../processor";
import { getFeeDetails, getPaymentInfo } from "../util/extrinsic";
import { getDocs, getErrorMessage, hexToNativeAddress, toCamelCase } from "../util/util";

export class ExtrinsicManager {  
    extrinsicsData: Map<string, ExtrinsicData> = new Map();
  
    async process(event: Event<Fields>): Promise<bigint> {
        if (this.extrinsicsData.has(event.extrinsic!.id)) return BigInt(0);

        let signer = "";
        let signedData = null;
        if (event.extrinsic?.signature?.address) {
            signer = hexToNativeAddress(event.extrinsic!.signature!.address as string);
            const [fee, feeDetails] = await Promise.all([
                getPaymentInfo(event, event.block.parentHash),
                getFeeDetails(event, event.block.parentHash)
            ]);
            fee.partialFee = fee.partialFee && BigInt(fee.partialFee) || BigInt(0);
            feeDetails.inclusionFee.baseFee = feeDetails.inclusionFee?.baseFee && BigInt(feeDetails.inclusionFee.baseFee) || BigInt(0);
            feeDetails.inclusionFee.lenFee = feeDetails.inclusionFee?.lenFee && BigInt(feeDetails.inclusionFee.lenFee) || BigInt(0);
            feeDetails.inclusionFee.adjustedWeightFee = feeDetails.inclusionFee?.adjustedWeightFee && BigInt(feeDetails.inclusionFee.adjustedWeightFee) || BigInt(0);
            signedData = { fee, feeDetails };
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
}

  