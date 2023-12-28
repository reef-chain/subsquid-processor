import { Event } from "@subsquid/substrate-processor";
import { EventData } from "../interfaces/interfaces";
import { Block, Event as EventModel, Extrinsic } from "../model";
import { ctx, Fields } from "../processor";
import { hexToNativeAddress } from "../util/util";

export class EventManager {  
    eventsData: EventData[] = [];
  
    process(event: Event<Fields>) {
        const eventData = {
            id: event.id,
            blockId: event.block.id,
            extrinsicId: event.extrinsic!.id,
            index: event.index,
            phase: event.phase[0].toLowerCase() + event.phase.substring(1),
            section: event.name.split(".")[0],
            method: event.name.split(".")[1],
            data: this.getBlockData(event.name, event.args),
            timestamp: new Date(event.block.timestamp!),
        };

        this.eventsData.push(eventData);
    }
  
    async save(blocks: Map<string, Block>, extrinsics: Map<string, Extrinsic>): Promise<Map<string, EventModel>> {
        const events: Map<string, EventModel> = new Map();
        this.eventsData.forEach(eventData => {
            const block = blocks.get(eventData.blockId);
            if (!block) {
                ctx.log.error(`ERROR saving event: Block ${eventData.blockId} not found`);
                return;
            }
    
            const extrinsic = extrinsics.get(eventData.extrinsicId);
            if (!extrinsic) {
                ctx.log.error(`ERROR saving event: Extrinsic ${eventData.extrinsicId} not found`);
                return;
            }
            events.set(eventData.id, new EventModel({
                ...eventData,
                block: block,
                extrinsic: extrinsic
            }));
        });
    
        await ctx.store.insert([...events.values()]);
    
        return events;
    }

    private getBlockData(eventName: string, args: any): any {
        switch (eventName) {
            case "EVM.Created":
            case "EVM.Executed":
            case "Identity.IdentitySet":
            case "System.NewAccount":
                return [args];
            case "EvmAccounts.ClaimAccount":
            case "Poc.Commited":
            case "Balances.Endowed":
            case "Balances.Reserved":
            case "Balances.Unreserved":
            case "Staking.Bonded":
            case "Staking.Reward":
            case "Staking.Unbonded":
                return [hexToNativeAddress(args[0]), args[1] ];
            case "Balances.Transfer":
                return [hexToNativeAddress(args[0]), hexToNativeAddress(args[1]), args[2]['__kind']];
            case "Balances.ReserveRepatriated":
                return [hexToNativeAddress(args[0]), hexToNativeAddress(args[1]), args[2], args[3]];
            default:
                const data: any = {};
                for (const key in args) {
                    if (typeof args[key] === 'object') {
                        data[key] = args[key]['__kind'];
                    } else {
                        data[key] = args[key];
                    }
                }
                return data;
        }
    }
}
