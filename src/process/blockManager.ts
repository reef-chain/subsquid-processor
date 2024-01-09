import { BlockHeader } from "@subsquid/substrate-processor";
import { Block } from "../model";
import { Fields, SUPPORT_HOT_BLOCKS, ctx } from "../processor";
import { hexToNativeAddress } from "../util/util";

export class BlockManager {  
    blocks: Map<string, Block> = new Map();
  
    process(blockHeader: BlockHeader<Fields>) {
        const block = new Block ({
            id: blockHeader.id,
            height: blockHeader.height,
            hash: blockHeader.hash,
            author: hexToNativeAddress(blockHeader.validator),
            stateRoot: blockHeader.stateRoot,
            parentHash: blockHeader.parentHash,
            extrinsicRoot: blockHeader.extrinsicsRoot,
            finalized: SUPPORT_HOT_BLOCKS ? false : true,
            timestamp: new Date(blockHeader.timestamp!),
            processorTimestamp: new Date(),
        });

        this.blocks.set(block.id, block);
    }
  
    async save(): Promise<Map<string, Block>> {
        await ctx.store.insert([...this.blocks.values()]);
        return this.blocks;
    }
  }

  