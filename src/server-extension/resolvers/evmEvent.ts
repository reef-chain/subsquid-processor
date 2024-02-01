import { DateTime, Json, Int } from '@subsquid/graphql-server';
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { EntityManager } from 'typeorm'
import { EvmEvent, EvmEventType } from '../../model';

@ObjectType()
export class EvmEventEntity {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => Int, { nullable: false })
  blockHeight!: number;

  @Field(() => String, { nullable: false })
  blockHash!: string;

  @Field(() => String, { nullable: false })
  extrinsicId!: string;

  @Field(() => String, { nullable: false })
  extrinsicHash!: string;

  @Field(() => Int, { nullable: false })
  extrinsicIndex!: number;

  @Field(() => Json, { nullable: false })
  rawData!: JSON;

  @Field(() => DateTime, { nullable: false })
  timestamp!: Date;

  @Field(() => Json, { nullable: true })
  signedData!: JSON;

  @Field(() => Boolean, { nullable: false })
  finalized!: boolean;

  constructor(props: Partial<EvmEventEntity>) {
    Object.assign(this, props);
  }
}

@InputType()
export class EvmEventDataParsedInput {
  @Field(() => String, { nullable: false })
  id!: string;
  
  @Field(() => String, { nullable: false })
  dataParsed!: string;

  constructor(props: Partial<EvmEventDataParsedInput>) {
    Object.assign(this, props);
  }
}

@Resolver()
export class EvmEventResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => [EvmEventEntity])
  async findBacktrackingEvmEvents(@Arg('id') id: string): Promise<EvmEventEntity[]> {
    const manager = await this.tx();
    const repository = manager.getRepository(EvmEventEntity);
    const query = `
      SELECT
        ee.id, ee.block_height, ee.block_hash,
        ee.extrinsic_index, ee.data_raw, ee.finalized,
        ee.timestamp as timestamp, ee.extrinsic_hash as extrinsic_hash,
        ex.signed_data, ex.id as extrinsic_id
      FROM evm_event as ee
      JOIN event as ev
        ON ev.id = ee.id
      JOIN extrinsic as ex
        ON ev.extrinsic_id = ex.id
      WHERE ee.contract_address = $1 AND ee.type = 'Unverified';
    `;
    const result = await repository.query(query, [id]);
    return result.map((evmEvent: any) => new EvmEventEntity({
      id: evmEvent.id,
      blockHeight: evmEvent.block_height,
      blockHash: evmEvent.block_hash,
      extrinsicId: evmEvent.extrinsic_id,
      extrinsicHash: evmEvent.extrinsic_hash,
      extrinsicIndex: evmEvent.extrinsic_index,
      rawData: evmEvent.data_raw,
      timestamp: evmEvent.timestamp,
      signedData: evmEvent.signed_data,
      finalized: evmEvent.finalized,
    }));
  }
  
  @Mutation(() => Boolean) async updateEvmEventsDataParsed(
    @Arg('evmEvents', () => [EvmEventDataParsedInput]) evmEvents: EvmEventDataParsedInput[],
  ): Promise<Boolean> {
    console.debug(`EvmEventResolver.updateEvmEventsDataParsed: ${evmEvents.length} events (first: ${evmEvents.length ? evmEvents[0].id : ''}))`);
    const manager = await this.tx();

    const updatePromises = evmEvents.map((evmEvent) => manager.update(
      EvmEvent, evmEvent.id, { dataParsed: JSON.parse(evmEvent.dataParsed), type: EvmEventType.Verified }
    ));
    await Promise.all(updatePromises);

    return true;
  }
}
