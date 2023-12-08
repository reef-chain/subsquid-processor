import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v5 from '../v5'

export const totalIssuance =  {
    /**
     *  The total units issued in the system.
     */
    v5: new StorageType('Balances.TotalIssuance', 'Default', [], v5.Balance) as TotalIssuanceV5,
}

/**
 *  The total units issued in the system.
 */
export interface TotalIssuanceV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.Balance
    get(block: Block): Promise<(v5.Balance | undefined)>
}

export const account =  {
    /**
     *  The balance of an account.
     * 
     *  NOTE: This is only used in the case that this pallet is used to store balances.
     */
    v5: new StorageType('Balances.Account', 'Default', [v5.AccountId], v5.AccountData) as AccountV5,
}

/**
 *  The balance of an account.
 * 
 *  NOTE: This is only used in the case that this pallet is used to store balances.
 */
export interface AccountV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.AccountData
    get(block: Block, key: v5.AccountId): Promise<(v5.AccountData | undefined)>
    getMany(block: Block, keys: v5.AccountId[]): Promise<(v5.AccountData | undefined)[]>
    getKeys(block: Block): Promise<v5.AccountId[]>
    getKeys(block: Block, key: v5.AccountId): Promise<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<v5.AccountId[]>
    getPairs(block: Block): Promise<[k: v5.AccountId, v: (v5.AccountData | undefined)][]>
    getPairs(block: Block, key: v5.AccountId): Promise<[k: v5.AccountId, v: (v5.AccountData | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.AccountId, v: (v5.AccountData | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<[k: v5.AccountId, v: (v5.AccountData | undefined)][]>
}

export const locks =  {
    /**
     *  Any liquidity locks on some account balances.
     *  NOTE: Should only be accessed when setting, changing and freeing a lock.
     */
    v5: new StorageType('Balances.Locks', 'Default', [v5.AccountId], sts.array(() => v5.BalanceLock)) as LocksV5,
}

/**
 *  Any liquidity locks on some account balances.
 *  NOTE: Should only be accessed when setting, changing and freeing a lock.
 */
export interface LocksV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.BalanceLock[]
    get(block: Block, key: v5.AccountId): Promise<(v5.BalanceLock[] | undefined)>
    getMany(block: Block, keys: v5.AccountId[]): Promise<(v5.BalanceLock[] | undefined)[]>
    getKeys(block: Block): Promise<v5.AccountId[]>
    getKeys(block: Block, key: v5.AccountId): Promise<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<v5.AccountId[]>
    getPairs(block: Block): Promise<[k: v5.AccountId, v: (v5.BalanceLock[] | undefined)][]>
    getPairs(block: Block, key: v5.AccountId): Promise<[k: v5.AccountId, v: (v5.BalanceLock[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.AccountId, v: (v5.BalanceLock[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<[k: v5.AccountId, v: (v5.BalanceLock[] | undefined)][]>
}

export const storageVersion =  {
    /**
     *  Storage version of the pallet.
     * 
     *  This is set to v2.0.0 for new networks.
     */
    v5: new StorageType('Balances.StorageVersion', 'Default', [], v5.Releases) as StorageVersionV5,
}

/**
 *  Storage version of the pallet.
 * 
 *  This is set to v2.0.0 for new networks.
 */
export interface StorageVersionV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.Releases
    get(block: Block): Promise<(v5.Releases | undefined)>
}
