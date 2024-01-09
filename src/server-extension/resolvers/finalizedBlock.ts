import type { EntityManager } from 'typeorm'
import { LessThanOrEqual } from "typeorm";
import { Arg, Mutation, Resolver } from 'type-graphql'
import { Block } from '../../model';

// Notice: Only required if we want support for hot blocks

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

    const maxUpdateSize = 100_000;
    height = height - firstUnfinalizedBlock.height >= maxUpdateSize ? firstUnfinalizedBlock.height + maxUpdateSize - 1 : height;
    await manager.update(
      Block,
      { height: LessThanOrEqual(height), finalized: false },
      { finalized: true }
    );

    return true;
  }
}