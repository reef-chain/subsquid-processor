import { Event } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";
import { AccountManager } from "./accountManager";
import { ABIS, EvmEventData } from "../interfaces/interfaces";
import { EvmEvent, EvmEventStatus, EvmEventType, VerifiedContract } from "../model";
import { toChecksumAddress } from "../util/util";
import { TransferManager } from "./transferManager";
import { ethers } from "ethers";
import { ctx, Fields, SUPPORT_HOT_BLOCKS } from "../processor";

export class EvmEventManager {  
    evmEventsData: EvmEventData[] = [];
  
    async process(
        event: Event<Fields>, 
        feeAmount: bigint,
        transferManager: TransferManager,
        accountManager: AccountManager,
        store?: Store
    ) {
        const method = event.name.split('.')[1];

        let contractAddress;
        let status;
        let type = EvmEventType.Unverified;
        let dataParsed: any = {};
        let topic0, topic1, topic2, topic3 = null;

        if (method === 'Log') {
            status = EvmEventStatus.Success;
            topic0 = event.args.topics[0] || null;
            topic1 = event.args.topics[1] || null;
            topic2 = event.args.topics[2] || null;
            topic3 = event.args.topics[3] || null;
            contractAddress = toChecksumAddress(event.args.address);
            const contract = await store!.get(VerifiedContract, contractAddress);
            if (contract) {
                const iface = new ethers.Interface((contract.compiledData as ABIS)[contract.name]);
                const topics = event.args.topics;
                const data = event.args.data;
                dataParsed = iface.parseLog({ topics, data });
                type = EvmEventType.Verified;
                await transferManager.process(event, accountManager, contract, feeAmount);
            }
        } else if (method === 'ExecutedFailed') {
            status = EvmEventStatus.Error;
            contractAddress = toChecksumAddress(event.args > 3 ? event.args[1] : event.args[0]);
            let decodedMessage = "";
            let eventDataHex = event.args[event.args.length - 2];
            if (!(typeof eventDataHex === 'string')) {
                eventDataHex = event.args[event.args.length - 1];
            }
            try {
                decodedMessage = ethers.toUtf8String(`0x${eventDataHex.substr(138)}`.replace(/0+$/, ''));
            } catch (e) {}
            dataParsed = { message: decodedMessage };
        } else {
            return;
        }

        const evmEventData = {
            id: event.id,
            blockHeight: event.block.height,
            blockHash: event.block.hash,
            finalized: SUPPORT_HOT_BLOCKS ? false : true,
            eventIndex: event.index,
            extrinsicIndex: event.extrinsic!.index,
            contractAddress: contractAddress,
            dataRaw: event.args,
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
  
    async save() {
        const evmLogEvents: EvmEvent[] = this.evmEventsData.map(evmLogEventData => {            
            return new EvmEvent(evmLogEventData);
        })
        await ctx.store.insert(evmLogEvents);
    }
}

  