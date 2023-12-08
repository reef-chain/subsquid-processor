import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v5 from '../v5'

export const account =  {
    /**
     *  The full account information for a particular account ID.
     */
    v5: new StorageType('System.Account', 'Default', [v5.AccountId], v5.AccountInfo) as AccountV5,
}

/**
 *  The full account information for a particular account ID.
 */
export interface AccountV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.AccountInfo
    get(block: Block, key: v5.AccountId): Promise<(v5.AccountInfo | undefined)>
    getMany(block: Block, keys: v5.AccountId[]): Promise<(v5.AccountInfo | undefined)[]>
    getKeys(block: Block): Promise<v5.AccountId[]>
    getKeys(block: Block, key: v5.AccountId): Promise<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<v5.AccountId[]>
    getPairs(block: Block): Promise<[k: v5.AccountId, v: (v5.AccountInfo | undefined)][]>
    getPairs(block: Block, key: v5.AccountId): Promise<[k: v5.AccountId, v: (v5.AccountInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.AccountId, v: (v5.AccountInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<[k: v5.AccountId, v: (v5.AccountInfo | undefined)][]>
}

export const extrinsicCount =  {
    /**
     *  Total extrinsics count for the current block.
     */
    v5: new StorageType('System.ExtrinsicCount', 'Optional', [], sts.number()) as ExtrinsicCountV5,
}

/**
 *  Total extrinsics count for the current block.
 */
export interface ExtrinsicCountV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(number | undefined)>
}

export const blockWeight =  {
    /**
     *  The current weight for the block.
     */
    v5: new StorageType('System.BlockWeight', 'Default', [], v5.ConsumedWeight) as BlockWeightV5,
}

/**
 *  The current weight for the block.
 */
export interface BlockWeightV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.ConsumedWeight
    get(block: Block): Promise<(v5.ConsumedWeight | undefined)>
}

export const allExtrinsicsLen =  {
    /**
     *  Total length (in bytes) for all extrinsics put together, for the current block.
     */
    v5: new StorageType('System.AllExtrinsicsLen', 'Optional', [], sts.number()) as AllExtrinsicsLenV5,
}

/**
 *  Total length (in bytes) for all extrinsics put together, for the current block.
 */
export interface AllExtrinsicsLenV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(number | undefined)>
}

export const blockHash =  {
    /**
     *  Map of block numbers to block hashes.
     */
    v5: new StorageType('System.BlockHash', 'Default', [v5.BlockNumber], v5.Hash) as BlockHashV5,
}

/**
 *  Map of block numbers to block hashes.
 */
export interface BlockHashV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.Hash
    get(block: Block, key: v5.BlockNumber): Promise<(v5.Hash | undefined)>
    getMany(block: Block, keys: v5.BlockNumber[]): Promise<(v5.Hash | undefined)[]>
    getKeys(block: Block): Promise<v5.BlockNumber[]>
    getKeys(block: Block, key: v5.BlockNumber): Promise<v5.BlockNumber[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.BlockNumber[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.BlockNumber): AsyncIterable<v5.BlockNumber[]>
    getPairs(block: Block): Promise<[k: v5.BlockNumber, v: (v5.Hash | undefined)][]>
    getPairs(block: Block, key: v5.BlockNumber): Promise<[k: v5.BlockNumber, v: (v5.Hash | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.BlockNumber, v: (v5.Hash | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.BlockNumber): AsyncIterable<[k: v5.BlockNumber, v: (v5.Hash | undefined)][]>
}

export const extrinsicData =  {
    /**
     *  Extrinsics data for the current block (maps an extrinsic's index to its data).
     */
    v5: new StorageType('System.ExtrinsicData', 'Default', [sts.number()], sts.bytes()) as ExtrinsicDataV5,
}

/**
 *  Extrinsics data for the current block (maps an extrinsic's index to its data).
 */
export interface ExtrinsicDataV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): Bytes
    get(block: Block, key: number): Promise<(Bytes | undefined)>
    getMany(block: Block, keys: number[]): Promise<(Bytes | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (Bytes | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (Bytes | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (Bytes | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (Bytes | undefined)][]>
}

export const number =  {
    /**
     *  The current block number being processed. Set by `execute_block`.
     */
    v5: new StorageType('System.Number', 'Default', [], v5.BlockNumber) as NumberV5,
}

/**
 *  The current block number being processed. Set by `execute_block`.
 */
export interface NumberV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.BlockNumber
    get(block: Block): Promise<(v5.BlockNumber | undefined)>
}

export const parentHash =  {
    /**
     *  Hash of the previous block.
     */
    v5: new StorageType('System.ParentHash', 'Default', [], v5.Hash) as ParentHashV5,
}

/**
 *  Hash of the previous block.
 */
export interface ParentHashV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.Hash
    get(block: Block): Promise<(v5.Hash | undefined)>
}

export const digest =  {
    /**
     *  Digest of the current block, also part of the block header.
     */
    v5: new StorageType('System.Digest', 'Default', [], v5.DigestOf) as DigestV5,
}

/**
 *  Digest of the current block, also part of the block header.
 */
export interface DigestV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.DigestOf
    get(block: Block): Promise<(v5.DigestOf | undefined)>
}

export const events =  {
    /**
     *  Events deposited for the current block.
     */
    v5: new StorageType('System.Events', 'Default', [], sts.array(() => v5.EventRecord)) as EventsV5,
}

/**
 *  Events deposited for the current block.
 */
export interface EventsV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.EventRecord[]
    get(block: Block): Promise<(v5.EventRecord[] | undefined)>
}

export const eventCount =  {
    /**
     *  The number of events in the `Events<T>` list.
     */
    v5: new StorageType('System.EventCount', 'Default', [], v5.EventIndex) as EventCountV5,
}

/**
 *  The number of events in the `Events<T>` list.
 */
export interface EventCountV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.EventIndex
    get(block: Block): Promise<(v5.EventIndex | undefined)>
}

export const eventTopics =  {
    /**
     *  Mapping between a topic (represented by T::Hash) and a vector of indexes
     *  of events in the `<Events<T>>` list.
     * 
     *  All topic vectors have deterministic storage locations depending on the topic. This
     *  allows light-clients to leverage the changes trie storage tracking mechanism and
     *  in case of changes fetch the list of events of interest.
     * 
     *  The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
     *  the `EventIndex` then in case if the topic has the same contents on the next block
     *  no notification will be triggered thus the event might be lost.
     */
    v5: new StorageType('System.EventTopics', 'Default', [v5.Hash], sts.array(() => sts.tuple(() => [v5.BlockNumber, v5.EventIndex]))) as EventTopicsV5,
}

/**
 *  Mapping between a topic (represented by T::Hash) and a vector of indexes
 *  of events in the `<Events<T>>` list.
 * 
 *  All topic vectors have deterministic storage locations depending on the topic. This
 *  allows light-clients to leverage the changes trie storage tracking mechanism and
 *  in case of changes fetch the list of events of interest.
 * 
 *  The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
 *  the `EventIndex` then in case if the topic has the same contents on the next block
 *  no notification will be triggered thus the event might be lost.
 */
export interface EventTopicsV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): [v5.BlockNumber, v5.EventIndex][]
    get(block: Block, key: v5.Hash): Promise<([v5.BlockNumber, v5.EventIndex][] | undefined)>
    getMany(block: Block, keys: v5.Hash[]): Promise<([v5.BlockNumber, v5.EventIndex][] | undefined)[]>
    getKeys(block: Block): Promise<v5.Hash[]>
    getKeys(block: Block, key: v5.Hash): Promise<v5.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.Hash): AsyncIterable<v5.Hash[]>
    getPairs(block: Block): Promise<[k: v5.Hash, v: ([v5.BlockNumber, v5.EventIndex][] | undefined)][]>
    getPairs(block: Block, key: v5.Hash): Promise<[k: v5.Hash, v: ([v5.BlockNumber, v5.EventIndex][] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.Hash, v: ([v5.BlockNumber, v5.EventIndex][] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.Hash): AsyncIterable<[k: v5.Hash, v: ([v5.BlockNumber, v5.EventIndex][] | undefined)][]>
}

export const lastRuntimeUpgrade =  {
    /**
     *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
     */
    v5: new StorageType('System.LastRuntimeUpgrade', 'Optional', [], v5.LastRuntimeUpgradeInfo) as LastRuntimeUpgradeV5,
}

/**
 *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
 */
export interface LastRuntimeUpgradeV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v5.LastRuntimeUpgradeInfo | undefined)>
}

export const upgradedToU32RefCount =  {
    /**
     *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
     */
    v5: new StorageType('System.UpgradedToU32RefCount', 'Default', [], sts.boolean()) as UpgradedToU32RefCountV5,
}

/**
 *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
 */
export interface UpgradedToU32RefCountV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): boolean
    get(block: Block): Promise<(boolean | undefined)>
}

export const upgradedToDualRefCount =  {
    /**
     *  True if we have upgraded so that AccountInfo contains two types of `RefCount`. False
     *  (default) if not.
     */
    v5: new StorageType('System.UpgradedToDualRefCount', 'Default', [], sts.boolean()) as UpgradedToDualRefCountV5,
}

/**
 *  True if we have upgraded so that AccountInfo contains two types of `RefCount`. False
 *  (default) if not.
 */
export interface UpgradedToDualRefCountV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): boolean
    get(block: Block): Promise<(boolean | undefined)>
}

export const executionPhase =  {
    /**
     *  The execution phase of the block.
     */
    v5: new StorageType('System.ExecutionPhase', 'Optional', [], v5.Phase) as ExecutionPhaseV5,
}

/**
 *  The execution phase of the block.
 */
export interface ExecutionPhaseV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v5.Phase | undefined)>
}
