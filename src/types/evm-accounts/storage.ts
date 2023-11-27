import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v5 from '../v5'

export const accounts =  {
    v5: new StorageType('EvmAccounts.Accounts', 'Optional', [v5.EvmAddress], v5.AccountId) as AccountsV5,
}

export interface AccountsV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v5.EvmAddress): Promise<(v5.AccountId | undefined)>
    getMany(block: Block, keys: v5.EvmAddress[]): Promise<(v5.AccountId | undefined)[]>
    getKeys(block: Block): Promise<v5.EvmAddress[]>
    getKeys(block: Block, key: v5.EvmAddress): Promise<v5.EvmAddress[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.EvmAddress[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.EvmAddress): AsyncIterable<v5.EvmAddress[]>
    getPairs(block: Block): Promise<[k: v5.EvmAddress, v: (v5.AccountId | undefined)][]>
    getPairs(block: Block, key: v5.EvmAddress): Promise<[k: v5.EvmAddress, v: (v5.AccountId | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.EvmAddress, v: (v5.AccountId | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.EvmAddress): AsyncIterable<[k: v5.EvmAddress, v: (v5.AccountId | undefined)][]>
}

export const evmAddresses =  {
    v5: new StorageType('EvmAccounts.EvmAddresses', 'Optional', [v5.AccountId], v5.EvmAddress) as EvmAddressesV5,
}

export interface EvmAddressesV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v5.AccountId): Promise<(v5.EvmAddress | undefined)>
    getMany(block: Block, keys: v5.AccountId[]): Promise<(v5.EvmAddress | undefined)[]>
    getKeys(block: Block): Promise<v5.AccountId[]>
    getKeys(block: Block, key: v5.AccountId): Promise<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<v5.AccountId[]>
    getPairs(block: Block): Promise<[k: v5.AccountId, v: (v5.EvmAddress | undefined)][]>
    getPairs(block: Block, key: v5.AccountId): Promise<[k: v5.AccountId, v: (v5.EvmAddress | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.AccountId, v: (v5.EvmAddress | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<[k: v5.AccountId, v: (v5.EvmAddress | undefined)][]>
}
