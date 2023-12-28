import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v5 from '../v5'
import * as v10 from '../v10'

export const accounts =  {
    /**
     *  Accounts info.
     */
    v5: new StorageType('EVM.Accounts', 'Optional', [v5.EvmAddress], v5.EvmAccountInfo) as AccountsV5,
}

/**
 *  Accounts info.
 */
export interface AccountsV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v5.EvmAddress): Promise<(v5.EvmAccountInfo | undefined)>
    getMany(block: Block, keys: v5.EvmAddress[]): Promise<(v5.EvmAccountInfo | undefined)[]>
    getKeys(block: Block): Promise<v5.EvmAddress[]>
    getKeys(block: Block, key: v5.EvmAddress): Promise<v5.EvmAddress[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.EvmAddress[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.EvmAddress): AsyncIterable<v5.EvmAddress[]>
    getPairs(block: Block): Promise<[k: v5.EvmAddress, v: (v5.EvmAccountInfo | undefined)][]>
    getPairs(block: Block, key: v5.EvmAddress): Promise<[k: v5.EvmAddress, v: (v5.EvmAccountInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.EvmAddress, v: (v5.EvmAccountInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.EvmAddress): AsyncIterable<[k: v5.EvmAddress, v: (v5.EvmAccountInfo | undefined)][]>
}

export const accountStorages =  {
    v5: new StorageType('EVM.AccountStorages', 'Default', [v5.EvmAddress, v5.H256], v5.H256) as AccountStoragesV5,
}

export interface AccountStoragesV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.H256
    get(block: Block, key1: v5.EvmAddress, key2: v5.H256): Promise<(v5.H256 | undefined)>
    getMany(block: Block, keys: [v5.EvmAddress, v5.H256][]): Promise<(v5.H256 | undefined)[]>
    getKeys(block: Block): Promise<[v5.EvmAddress, v5.H256][]>
    getKeys(block: Block, key1: v5.EvmAddress): Promise<[v5.EvmAddress, v5.H256][]>
    getKeys(block: Block, key1: v5.EvmAddress, key2: v5.H256): Promise<[v5.EvmAddress, v5.H256][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v5.EvmAddress, v5.H256][]>
    getKeysPaged(pageSize: number, block: Block, key1: v5.EvmAddress): AsyncIterable<[v5.EvmAddress, v5.H256][]>
    getKeysPaged(pageSize: number, block: Block, key1: v5.EvmAddress, key2: v5.H256): AsyncIterable<[v5.EvmAddress, v5.H256][]>
    getPairs(block: Block): Promise<[k: [v5.EvmAddress, v5.H256], v: (v5.H256 | undefined)][]>
    getPairs(block: Block, key1: v5.EvmAddress): Promise<[k: [v5.EvmAddress, v5.H256], v: (v5.H256 | undefined)][]>
    getPairs(block: Block, key1: v5.EvmAddress, key2: v5.H256): Promise<[k: [v5.EvmAddress, v5.H256], v: (v5.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v5.EvmAddress, v5.H256], v: (v5.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v5.EvmAddress): AsyncIterable<[k: [v5.EvmAddress, v5.H256], v: (v5.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v5.EvmAddress, key2: v5.H256): AsyncIterable<[k: [v5.EvmAddress, v5.H256], v: (v5.H256 | undefined)][]>
}

export const codes =  {
    v5: new StorageType('EVM.Codes', 'Default', [v5.H256], sts.bytes()) as CodesV5,
}

export interface CodesV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): Bytes
    get(block: Block, key: v5.H256): Promise<(Bytes | undefined)>
    getMany(block: Block, keys: v5.H256[]): Promise<(Bytes | undefined)[]>
    getKeys(block: Block): Promise<v5.H256[]>
    getKeys(block: Block, key: v5.H256): Promise<v5.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.H256): AsyncIterable<v5.H256[]>
    getPairs(block: Block): Promise<[k: v5.H256, v: (Bytes | undefined)][]>
    getPairs(block: Block, key: v5.H256): Promise<[k: v5.H256, v: (Bytes | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.H256, v: (Bytes | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.H256): AsyncIterable<[k: v5.H256, v: (Bytes | undefined)][]>
}

export const codeInfos =  {
    v5: new StorageType('EVM.CodeInfos', 'Optional', [v5.H256], v5.CodeInfo) as CodeInfosV5,
}

export interface CodeInfosV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v5.H256): Promise<(v5.CodeInfo | undefined)>
    getMany(block: Block, keys: v5.H256[]): Promise<(v5.CodeInfo | undefined)[]>
    getKeys(block: Block): Promise<v5.H256[]>
    getKeys(block: Block, key: v5.H256): Promise<v5.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.H256): AsyncIterable<v5.H256[]>
    getPairs(block: Block): Promise<[k: v5.H256, v: (v5.CodeInfo | undefined)][]>
    getPairs(block: Block, key: v5.H256): Promise<[k: v5.H256, v: (v5.CodeInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.H256, v: (v5.CodeInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.H256): AsyncIterable<[k: v5.H256, v: (v5.CodeInfo | undefined)][]>
}

export const networkContractIndex =  {
    /**
     *  Next available system contract address.
     */
    v5: new StorageType('EVM.NetworkContractIndex', 'Default', [], sts.bigint()) as NetworkContractIndexV5,
}

/**
 *  Next available system contract address.
 */
export interface NetworkContractIndexV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block): Promise<(bigint | undefined)>
}

export const extrinsicOrigin =  {
    /**
     *  Extrinsics origin for the current tx.
     */
    v5: new StorageType('EVM.ExtrinsicOrigin', 'Optional', [], v5.AccountId) as ExtrinsicOriginV5,
}

/**
 *  Extrinsics origin for the current tx.
 */
export interface ExtrinsicOriginV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v5.AccountId | undefined)>
}

export const queuedEvents =  {
    /**
     *  Queued Events
     */
    v10: new StorageType('EVM.QueuedEvents', 'Default', [], sts.array(() => v10.Type_276)) as QueuedEventsV10,
}

/**
 *  Queued Events
 */
export interface QueuedEventsV10  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v10.Type_276[]
    get(block: Block): Promise<(v10.Type_276[] | undefined)>
}
