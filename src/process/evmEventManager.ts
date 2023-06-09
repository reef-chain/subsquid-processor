import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";
import { AccountManager } from "./accountManager";
import { ABIS, EventRaw, EvmEventData } from "../interfaces/interfaces";
import { Block, Event, EvmEvent, EvmEventStatus, EvmEventType, VerifiedContract } from "../model";
import { toChecksumAddress } from "../util/util";
import { TransferManager } from "./transferManager";
import { ethers } from "ethers";
import { ctx } from "../processor";

export class EvmEventManager {  
    evmEventsData: EvmEventData[] = [];
  
    async process(
        eventRaw: EventRaw, 
        blockHeader: SubstrateBlock,
        feeAmount: bigint,
        transferManager: TransferManager,
        accountManager: AccountManager,
        store?: Store
    ) {
        const method = eventRaw.name.split('.')[1];

        let contractAddress;
        let status;
        let type = EvmEventType.Unverified;
        let dataParsed = {};
        let topic0, topic1, topic2, topic3 = null;

        if (method === 'Log') {
            status = EvmEventStatus.Success;
            topic0 = eventRaw.args.topics[0] || null;
            topic1 = eventRaw.args.topics[1] || null;
            topic2 = eventRaw.args.topics[2] || null;
            topic3 = eventRaw.args.topics[3] || null;
            contractAddress = toChecksumAddress(eventRaw.args.address);
            const contract = await store!.get(VerifiedContract, contractAddress);
            if (contract) {
                const iface = new ethers.utils.Interface((contract.compiledData as ABIS)[contract.name]);
                const topics = eventRaw.args.topics;
                const data = eventRaw.args.data;
                dataParsed = iface.parseLog({ topics, data });
                type = EvmEventType.Verified;
                await transferManager.process(eventRaw, blockHeader, accountManager, contract, feeAmount);
            }
        } else if (method === 'ExecutedFailed') {
            status = EvmEventStatus.Error;
            contractAddress = toChecksumAddress(eventRaw.args > 3 ? eventRaw.args[1] : eventRaw.args[0]);
            let decodedMessage = "";
            let eventDataHex = eventRaw.args[eventRaw.args.length - 2];
            if (!(typeof eventDataHex === 'string')) {
                eventDataHex = eventRaw.args[eventRaw.args.length - 1];
            }
            try {
                decodedMessage = ethers.utils.toUtf8String(`0x${eventDataHex.substr(138)}`.replace(/0+$/, ''));
            } catch (e) {}
            dataParsed = { message: decodedMessage };
        } else {
            return;
        }

        const evmEventData = {
            id: eventRaw.id,
            blockId: blockHeader.id,
            eventIndex: eventRaw.indexInBlock,
            extrinsicIndex: eventRaw.extrinsic.indexInBlock,
            contractAddress: contractAddress,
            dataRaw: eventRaw.args,
            dataParsed: dataParsed,
            method: method,
            type: type,
            status: status,
            topic0: topic0,
            topic1: topic1,
            topic2: topic2,
            topic3: topic3
        };

        this.evmEventsData.push(evmEventData);
    }
  
    async save(blocks: Map<string, Block>, events: Map<string, Event>) {
        const evmLogEvents: EvmEvent[] = this.evmEventsData.map(evmLogEventData => {
            const block = blocks.get(evmLogEventData.blockId);
            if (!block) {
                ctx.log.error(`ERROR saving evm event: Block ${evmLogEventData.blockId} not found`);
            }
    
            const event = events.get(evmLogEventData.id);
            if (!event) {
                ctx.log.error(`ERROR saving evm event: Event ${evmLogEventData.id} not found`);
            }
            
            return new EvmEvent({
                ...evmLogEventData,
                block: block,
                event: event
            });
        })
        .filter(e => e.block && e.event);
    
        await ctx.store.insert(evmLogEvents);
    }
}

  