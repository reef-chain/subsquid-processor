import type { EntityManager } from 'typeorm'
import { LessThanOrEqual } from "typeorm";
import { Arg, Mutation,Resolver } from 'type-graphql'
import { Block } from '../../model';

@Resolver()
export class FinalizedBlockResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Mutation(() => Boolean) async newFinalizedBlock(
    @Arg('height') height: number,
    @Arg('hash') hash: string
  ): Promise<Boolean> {
    const manager = await this.tx();

    const block = await manager.findOneBy(Block, { height: height });
    if (block && block.hash !== hash) {
      console.log(`ERROR on finalized block ${height}: hash mismatch.`);
      return false;
    }

    await manager.update(
      Block, 
      { height: LessThanOrEqual(height), finalized: false }, 
      { finalized: true }
    );
    return true;
  }
}