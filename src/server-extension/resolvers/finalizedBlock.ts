import type { EntityManager } from 'typeorm'
import { LessThanOrEqual } from "typeorm";
import { Arg, Mutation, Resolver } from 'type-graphql'
import { Block, EvmEvent, Transfer } from '../../model';

@Resolver()
export class FinalizedBlockResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Mutation(() => Boolean) async newFinalizedBlock(
    @Arg('height') height: number
  ): Promise<Boolean> {
    console.debug(`FinalizedBlockResolver.newFinalizedBlock: ${height}`);
    const manager = await this.tx();

    const firstUnfinalizedBlock = await manager.findOneBy(Block, { finalized: false });
    if (!firstUnfinalizedBlock || firstUnfinalizedBlock.height > height) return true;

    const maxUpdateSize = 1000;
    height = height - firstUnfinalizedBlock.height >= maxUpdateSize ? firstUnfinalizedBlock.height + maxUpdateSize - 1 : height;

    // Update blocks
    await manager.update(
      Block,
      { height: LessThanOrEqual(height), finalized: false },
      { finalized: true }
    );

    // Update transfers
    const transfers = await manager.find(Transfer, { where: { finalized: false, blockHeight: LessThanOrEqual(height) } });
    for (const transfer of transfers) {
      const blockExists = await manager.findOneBy(Block, { hash: transfer.blockHash });
      if (blockExists) {
        transfer.finalized = true;
        await manager.save(transfer);
      } else {
        await manager.delete(Transfer, { id: transfer.id });
      }
    }

    // Update evmEvents
    const evmEvents = await manager.find(EvmEvent, { where: { finalized: false, blockHeight: LessThanOrEqual(height) } });
    for (const evmEvent of evmEvents) {
      const blockExists = await manager.findOneBy(Block, { hash: evmEvent.blockHash });
      if (blockExists) {
        evmEvent.finalized = true;
        await manager.save(evmEvent);
      } else {
        await manager.delete(EvmEvent, { id: evmEvent.id });
      }
    }

    return true;
  }
}