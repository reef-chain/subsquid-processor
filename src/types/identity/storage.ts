import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v5 from '../v5'

export const identityOf =  {
    /**
     *  Information that is pertinent to identify the entity behind an account.
     * 
     *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
     */
    v5: new StorageType('Identity.IdentityOf', 'Optional', [v5.AccountId], v5.Registration) as IdentityOfV5,
}

/**
 *  Information that is pertinent to identify the entity behind an account.
 * 
 *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
 */
export interface IdentityOfV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v5.AccountId): Promise<(v5.Registration | undefined)>
    getMany(block: Block, keys: v5.AccountId[]): Promise<(v5.Registration | undefined)[]>
    getKeys(block: Block): Promise<v5.AccountId[]>
    getKeys(block: Block, key: v5.AccountId): Promise<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<v5.AccountId[]>
    getPairs(block: Block): Promise<[k: v5.AccountId, v: (v5.Registration | undefined)][]>
    getPairs(block: Block, key: v5.AccountId): Promise<[k: v5.AccountId, v: (v5.Registration | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.AccountId, v: (v5.Registration | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<[k: v5.AccountId, v: (v5.Registration | undefined)][]>
}

export const superOf =  {
    /**
     *  The super-identity of an alternative "sub" identity together with its name, within that
     *  context. If the account is not some other account's sub-identity, then just `None`.
     */
    v5: new StorageType('Identity.SuperOf', 'Optional', [v5.AccountId], sts.tuple(() => [v5.AccountId, v5.Data])) as SuperOfV5,
}

/**
 *  The super-identity of an alternative "sub" identity together with its name, within that
 *  context. If the account is not some other account's sub-identity, then just `None`.
 */
export interface SuperOfV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v5.AccountId): Promise<([v5.AccountId, v5.Data] | undefined)>
    getMany(block: Block, keys: v5.AccountId[]): Promise<([v5.AccountId, v5.Data] | undefined)[]>
    getKeys(block: Block): Promise<v5.AccountId[]>
    getKeys(block: Block, key: v5.AccountId): Promise<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<v5.AccountId[]>
    getPairs(block: Block): Promise<[k: v5.AccountId, v: ([v5.AccountId, v5.Data] | undefined)][]>
    getPairs(block: Block, key: v5.AccountId): Promise<[k: v5.AccountId, v: ([v5.AccountId, v5.Data] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.AccountId, v: ([v5.AccountId, v5.Data] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<[k: v5.AccountId, v: ([v5.AccountId, v5.Data] | undefined)][]>
}

export const subsOf =  {
    /**
     *  Alternative "sub" identities of this account.
     * 
     *  The first item is the deposit, the second is a vector of the accounts.
     * 
     *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
     */
    v5: new StorageType('Identity.SubsOf', 'Default', [v5.AccountId], sts.tuple(() => [v5.BalanceOf, sts.array(() => v5.AccountId)])) as SubsOfV5,
}

/**
 *  Alternative "sub" identities of this account.
 * 
 *  The first item is the deposit, the second is a vector of the accounts.
 * 
 *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
 */
export interface SubsOfV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): [v5.BalanceOf, v5.AccountId[]]
    get(block: Block, key: v5.AccountId): Promise<([v5.BalanceOf, v5.AccountId[]] | undefined)>
    getMany(block: Block, keys: v5.AccountId[]): Promise<([v5.BalanceOf, v5.AccountId[]] | undefined)[]>
    getKeys(block: Block): Promise<v5.AccountId[]>
    getKeys(block: Block, key: v5.AccountId): Promise<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<v5.AccountId[]>
    getPairs(block: Block): Promise<[k: v5.AccountId, v: ([v5.BalanceOf, v5.AccountId[]] | undefined)][]>
    getPairs(block: Block, key: v5.AccountId): Promise<[k: v5.AccountId, v: ([v5.BalanceOf, v5.AccountId[]] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.AccountId, v: ([v5.BalanceOf, v5.AccountId[]] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<[k: v5.AccountId, v: ([v5.BalanceOf, v5.AccountId[]] | undefined)][]>
}

export const registrars =  {
    /**
     *  The set of registrars. Not expected to get very big as can only be added through a
     *  special origin (likely a council motion).
     * 
     *  The index into this can be cast to `RegistrarIndex` to get a valid value.
     */
    v5: new StorageType('Identity.Registrars', 'Default', [], sts.array(() => sts.option(() => v5.RegistrarInfo))) as RegistrarsV5,
}

/**
 *  The set of registrars. Not expected to get very big as can only be added through a
 *  special origin (likely a council motion).
 * 
 *  The index into this can be cast to `RegistrarIndex` to get a valid value.
 */
export interface RegistrarsV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): (v5.RegistrarInfo | undefined)[]
    get(block: Block): Promise<((v5.RegistrarInfo | undefined)[] | undefined)>
}
