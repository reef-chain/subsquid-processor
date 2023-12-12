import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v5 from '../v5'
import * as v8 from '../v8'

export const historyDepth =  {
    /**
     *  Number of eras to keep in history.
     * 
     *  Information is kept for eras in `[current_era - history_depth; current_era]`.
     * 
     *  Must be more than the number of eras delayed by session otherwise. I.e. active era must
     *  always be in history. I.e. `active_era > current_era - history_depth` must be
     *  guaranteed.
     */
    v5: new StorageType('Staking.HistoryDepth', 'Default', [], sts.number()) as HistoryDepthV5,
}

/**
 *  Number of eras to keep in history.
 * 
 *  Information is kept for eras in `[current_era - history_depth; current_era]`.
 * 
 *  Must be more than the number of eras delayed by session otherwise. I.e. active era must
 *  always be in history. I.e. `active_era > current_era - history_depth` must be
 *  guaranteed.
 */
export interface HistoryDepthV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number
    get(block: Block): Promise<(number | undefined)>
}

export const validatorCount =  {
    /**
     *  The ideal number of staking participants.
     */
    v5: new StorageType('Staking.ValidatorCount', 'Default', [], sts.number()) as ValidatorCountV5,
}

/**
 *  The ideal number of staking participants.
 */
export interface ValidatorCountV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number
    get(block: Block): Promise<(number | undefined)>
}

export const minimumValidatorCount =  {
    /**
     *  Minimum number of staking participants before emergency conditions are imposed.
     */
    v5: new StorageType('Staking.MinimumValidatorCount', 'Default', [], sts.number()) as MinimumValidatorCountV5,
}

/**
 *  Minimum number of staking participants before emergency conditions are imposed.
 */
export interface MinimumValidatorCountV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number
    get(block: Block): Promise<(number | undefined)>
}

export const invulnerables =  {
    /**
     *  Any validators that may never be slashed or forcibly kicked. It's a Vec since they're
     *  easy to initialize and the performance hit is minimal (we expect no more than four
     *  invulnerables) and restricted to testnets.
     */
    v5: new StorageType('Staking.Invulnerables', 'Default', [], sts.array(() => v5.AccountId)) as InvulnerablesV5,
}

/**
 *  Any validators that may never be slashed or forcibly kicked. It's a Vec since they're
 *  easy to initialize and the performance hit is minimal (we expect no more than four
 *  invulnerables) and restricted to testnets.
 */
export interface InvulnerablesV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.AccountId[]
    get(block: Block): Promise<(v5.AccountId[] | undefined)>
}

export const bonded =  {
    /**
     *  Map from all locked "stash" accounts to the controller account.
     */
    v5: new StorageType('Staking.Bonded', 'Optional', [v5.AccountId], v5.AccountId) as BondedV5,
}

/**
 *  Map from all locked "stash" accounts to the controller account.
 */
export interface BondedV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v5.AccountId): Promise<(v5.AccountId | undefined)>
    getMany(block: Block, keys: v5.AccountId[]): Promise<(v5.AccountId | undefined)[]>
    getKeys(block: Block): Promise<v5.AccountId[]>
    getKeys(block: Block, key: v5.AccountId): Promise<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<v5.AccountId[]>
    getPairs(block: Block): Promise<[k: v5.AccountId, v: (v5.AccountId | undefined)][]>
    getPairs(block: Block, key: v5.AccountId): Promise<[k: v5.AccountId, v: (v5.AccountId | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.AccountId, v: (v5.AccountId | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<[k: v5.AccountId, v: (v5.AccountId | undefined)][]>
}

export const ledger =  {
    /**
     *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
     */
    v5: new StorageType('Staking.Ledger', 'Optional', [v5.AccountId], v5.StakingLedger) as LedgerV5,
}

/**
 *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
 */
export interface LedgerV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v5.AccountId): Promise<(v5.StakingLedger | undefined)>
    getMany(block: Block, keys: v5.AccountId[]): Promise<(v5.StakingLedger | undefined)[]>
    getKeys(block: Block): Promise<v5.AccountId[]>
    getKeys(block: Block, key: v5.AccountId): Promise<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<v5.AccountId[]>
    getPairs(block: Block): Promise<[k: v5.AccountId, v: (v5.StakingLedger | undefined)][]>
    getPairs(block: Block, key: v5.AccountId): Promise<[k: v5.AccountId, v: (v5.StakingLedger | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.AccountId, v: (v5.StakingLedger | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<[k: v5.AccountId, v: (v5.StakingLedger | undefined)][]>
}

export const payee =  {
    /**
     *  Where the reward payment should be made. Keyed by stash.
     */
    v5: new StorageType('Staking.Payee', 'Default', [v5.AccountId], v5.RewardDestination) as PayeeV5,
}

/**
 *  Where the reward payment should be made. Keyed by stash.
 */
export interface PayeeV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.RewardDestination
    get(block: Block, key: v5.AccountId): Promise<(v5.RewardDestination | undefined)>
    getMany(block: Block, keys: v5.AccountId[]): Promise<(v5.RewardDestination | undefined)[]>
    getKeys(block: Block): Promise<v5.AccountId[]>
    getKeys(block: Block, key: v5.AccountId): Promise<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<v5.AccountId[]>
    getPairs(block: Block): Promise<[k: v5.AccountId, v: (v5.RewardDestination | undefined)][]>
    getPairs(block: Block, key: v5.AccountId): Promise<[k: v5.AccountId, v: (v5.RewardDestination | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.AccountId, v: (v5.RewardDestination | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<[k: v5.AccountId, v: (v5.RewardDestination | undefined)][]>
}

export const validators =  {
    /**
     *  The map from (wannabe) validator stash key to the preferences of that validator.
     */
    v5: new StorageType('Staking.Validators', 'Default', [v5.AccountId], v5.ValidatorPrefs) as ValidatorsV5,
}

/**
 *  The map from (wannabe) validator stash key to the preferences of that validator.
 */
export interface ValidatorsV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.ValidatorPrefs
    get(block: Block, key: v5.AccountId): Promise<(v5.ValidatorPrefs | undefined)>
    getMany(block: Block, keys: v5.AccountId[]): Promise<(v5.ValidatorPrefs | undefined)[]>
    getKeys(block: Block): Promise<v5.AccountId[]>
    getKeys(block: Block, key: v5.AccountId): Promise<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<v5.AccountId[]>
    getPairs(block: Block): Promise<[k: v5.AccountId, v: (v5.ValidatorPrefs | undefined)][]>
    getPairs(block: Block, key: v5.AccountId): Promise<[k: v5.AccountId, v: (v5.ValidatorPrefs | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.AccountId, v: (v5.ValidatorPrefs | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<[k: v5.AccountId, v: (v5.ValidatorPrefs | undefined)][]>
}

export const nominators =  {
    /**
     *  The map from nominator stash key to the set of stash keys of all validators to nominate.
     */
    v5: new StorageType('Staking.Nominators', 'Optional', [v5.AccountId], v5.Nominations) as NominatorsV5,
}

/**
 *  The map from nominator stash key to the set of stash keys of all validators to nominate.
 */
export interface NominatorsV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v5.AccountId): Promise<(v5.Nominations | undefined)>
    getMany(block: Block, keys: v5.AccountId[]): Promise<(v5.Nominations | undefined)[]>
    getKeys(block: Block): Promise<v5.AccountId[]>
    getKeys(block: Block, key: v5.AccountId): Promise<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<v5.AccountId[]>
    getPairs(block: Block): Promise<[k: v5.AccountId, v: (v5.Nominations | undefined)][]>
    getPairs(block: Block, key: v5.AccountId): Promise<[k: v5.AccountId, v: (v5.Nominations | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.AccountId, v: (v5.Nominations | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<[k: v5.AccountId, v: (v5.Nominations | undefined)][]>
}

export const currentEra =  {
    /**
     *  The current era index.
     * 
     *  This is the latest planned era, depending on how the Session pallet queues the validator
     *  set, it might be active or not.
     */
    v5: new StorageType('Staking.CurrentEra', 'Optional', [], v5.EraIndex) as CurrentEraV5,
}

/**
 *  The current era index.
 * 
 *  This is the latest planned era, depending on how the Session pallet queues the validator
 *  set, it might be active or not.
 */
export interface CurrentEraV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v5.EraIndex | undefined)>
}

export const activeEra =  {
    /**
     *  The active era information, it holds index and start.
     * 
     *  The active era is the era being currently rewarded. Validator set of this era must be
     *  equal to [`SessionInterface::validators`].
     */
    v5: new StorageType('Staking.ActiveEra', 'Optional', [], v5.ActiveEraInfo) as ActiveEraV5,
}

/**
 *  The active era information, it holds index and start.
 * 
 *  The active era is the era being currently rewarded. Validator set of this era must be
 *  equal to [`SessionInterface::validators`].
 */
export interface ActiveEraV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v5.ActiveEraInfo | undefined)>
}

export const erasStartSessionIndex =  {
    /**
     *  The session index at which the era start for the last `HISTORY_DEPTH` eras.
     * 
     *  Note: This tracks the starting session (i.e. session index when era start being active)
     *  for the eras in `[CurrentEra - HISTORY_DEPTH, CurrentEra]`.
     */
    v5: new StorageType('Staking.ErasStartSessionIndex', 'Optional', [v5.EraIndex], v5.SessionIndex) as ErasStartSessionIndexV5,
}

/**
 *  The session index at which the era start for the last `HISTORY_DEPTH` eras.
 * 
 *  Note: This tracks the starting session (i.e. session index when era start being active)
 *  for the eras in `[CurrentEra - HISTORY_DEPTH, CurrentEra]`.
 */
export interface ErasStartSessionIndexV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v5.EraIndex): Promise<(v5.SessionIndex | undefined)>
    getMany(block: Block, keys: v5.EraIndex[]): Promise<(v5.SessionIndex | undefined)[]>
    getKeys(block: Block): Promise<v5.EraIndex[]>
    getKeys(block: Block, key: v5.EraIndex): Promise<v5.EraIndex[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.EraIndex[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.EraIndex): AsyncIterable<v5.EraIndex[]>
    getPairs(block: Block): Promise<[k: v5.EraIndex, v: (v5.SessionIndex | undefined)][]>
    getPairs(block: Block, key: v5.EraIndex): Promise<[k: v5.EraIndex, v: (v5.SessionIndex | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.EraIndex, v: (v5.SessionIndex | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.EraIndex): AsyncIterable<[k: v5.EraIndex, v: (v5.SessionIndex | undefined)][]>
}

export const erasStakers =  {
    /**
     *  Exposure of validator at era.
     * 
     *  This is keyed first by the era index to allow bulk deletion and then the stash account.
     * 
     *  Is it removed after `HISTORY_DEPTH` eras.
     *  If stakers hasn't been set or has been removed then empty exposure is returned.
     */
    v5: new StorageType('Staking.ErasStakers', 'Default', [v5.EraIndex, v5.AccountId], v5.Exposure) as ErasStakersV5,
}

/**
 *  Exposure of validator at era.
 * 
 *  This is keyed first by the era index to allow bulk deletion and then the stash account.
 * 
 *  Is it removed after `HISTORY_DEPTH` eras.
 *  If stakers hasn't been set or has been removed then empty exposure is returned.
 */
export interface ErasStakersV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.Exposure
    get(block: Block, key1: v5.EraIndex, key2: v5.AccountId): Promise<(v5.Exposure | undefined)>
    getMany(block: Block, keys: [v5.EraIndex, v5.AccountId][]): Promise<(v5.Exposure | undefined)[]>
    getKeys(block: Block): Promise<[v5.EraIndex, v5.AccountId][]>
    getKeys(block: Block, key1: v5.EraIndex): Promise<[v5.EraIndex, v5.AccountId][]>
    getKeys(block: Block, key1: v5.EraIndex, key2: v5.AccountId): Promise<[v5.EraIndex, v5.AccountId][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v5.EraIndex, v5.AccountId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v5.EraIndex): AsyncIterable<[v5.EraIndex, v5.AccountId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v5.EraIndex, key2: v5.AccountId): AsyncIterable<[v5.EraIndex, v5.AccountId][]>
    getPairs(block: Block): Promise<[k: [v5.EraIndex, v5.AccountId], v: (v5.Exposure | undefined)][]>
    getPairs(block: Block, key1: v5.EraIndex): Promise<[k: [v5.EraIndex, v5.AccountId], v: (v5.Exposure | undefined)][]>
    getPairs(block: Block, key1: v5.EraIndex, key2: v5.AccountId): Promise<[k: [v5.EraIndex, v5.AccountId], v: (v5.Exposure | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v5.EraIndex, v5.AccountId], v: (v5.Exposure | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v5.EraIndex): AsyncIterable<[k: [v5.EraIndex, v5.AccountId], v: (v5.Exposure | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v5.EraIndex, key2: v5.AccountId): AsyncIterable<[k: [v5.EraIndex, v5.AccountId], v: (v5.Exposure | undefined)][]>
}

export const erasStakersClipped =  {
    /**
     *  Clipped Exposure of validator at era.
     * 
     *  This is similar to [`ErasStakers`] but number of nominators exposed is reduced to the
     *  `T::MaxNominatorRewardedPerValidator` biggest stakers.
     *  (Note: the field `total` and `own` of the exposure remains unchanged).
     *  This is used to limit the i/o cost for the nominator payout.
     * 
     *  This is keyed fist by the era index to allow bulk deletion and then the stash account.
     * 
     *  Is it removed after `HISTORY_DEPTH` eras.
     *  If stakers hasn't been set or has been removed then empty exposure is returned.
     */
    v5: new StorageType('Staking.ErasStakersClipped', 'Default', [v5.EraIndex, v5.AccountId], v5.Exposure) as ErasStakersClippedV5,
}

/**
 *  Clipped Exposure of validator at era.
 * 
 *  This is similar to [`ErasStakers`] but number of nominators exposed is reduced to the
 *  `T::MaxNominatorRewardedPerValidator` biggest stakers.
 *  (Note: the field `total` and `own` of the exposure remains unchanged).
 *  This is used to limit the i/o cost for the nominator payout.
 * 
 *  This is keyed fist by the era index to allow bulk deletion and then the stash account.
 * 
 *  Is it removed after `HISTORY_DEPTH` eras.
 *  If stakers hasn't been set or has been removed then empty exposure is returned.
 */
export interface ErasStakersClippedV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.Exposure
    get(block: Block, key1: v5.EraIndex, key2: v5.AccountId): Promise<(v5.Exposure | undefined)>
    getMany(block: Block, keys: [v5.EraIndex, v5.AccountId][]): Promise<(v5.Exposure | undefined)[]>
    getKeys(block: Block): Promise<[v5.EraIndex, v5.AccountId][]>
    getKeys(block: Block, key1: v5.EraIndex): Promise<[v5.EraIndex, v5.AccountId][]>
    getKeys(block: Block, key1: v5.EraIndex, key2: v5.AccountId): Promise<[v5.EraIndex, v5.AccountId][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v5.EraIndex, v5.AccountId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v5.EraIndex): AsyncIterable<[v5.EraIndex, v5.AccountId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v5.EraIndex, key2: v5.AccountId): AsyncIterable<[v5.EraIndex, v5.AccountId][]>
    getPairs(block: Block): Promise<[k: [v5.EraIndex, v5.AccountId], v: (v5.Exposure | undefined)][]>
    getPairs(block: Block, key1: v5.EraIndex): Promise<[k: [v5.EraIndex, v5.AccountId], v: (v5.Exposure | undefined)][]>
    getPairs(block: Block, key1: v5.EraIndex, key2: v5.AccountId): Promise<[k: [v5.EraIndex, v5.AccountId], v: (v5.Exposure | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v5.EraIndex, v5.AccountId], v: (v5.Exposure | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v5.EraIndex): AsyncIterable<[k: [v5.EraIndex, v5.AccountId], v: (v5.Exposure | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v5.EraIndex, key2: v5.AccountId): AsyncIterable<[k: [v5.EraIndex, v5.AccountId], v: (v5.Exposure | undefined)][]>
}

export const erasValidatorPrefs =  {
    /**
     *  Similar to `ErasStakers`, this holds the preferences of validators.
     * 
     *  This is keyed first by the era index to allow bulk deletion and then the stash account.
     * 
     *  Is it removed after `HISTORY_DEPTH` eras.
     */
    v5: new StorageType('Staking.ErasValidatorPrefs', 'Default', [v5.EraIndex, v5.AccountId], v5.ValidatorPrefs) as ErasValidatorPrefsV5,
}

/**
 *  Similar to `ErasStakers`, this holds the preferences of validators.
 * 
 *  This is keyed first by the era index to allow bulk deletion and then the stash account.
 * 
 *  Is it removed after `HISTORY_DEPTH` eras.
 */
export interface ErasValidatorPrefsV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.ValidatorPrefs
    get(block: Block, key1: v5.EraIndex, key2: v5.AccountId): Promise<(v5.ValidatorPrefs | undefined)>
    getMany(block: Block, keys: [v5.EraIndex, v5.AccountId][]): Promise<(v5.ValidatorPrefs | undefined)[]>
    getKeys(block: Block): Promise<[v5.EraIndex, v5.AccountId][]>
    getKeys(block: Block, key1: v5.EraIndex): Promise<[v5.EraIndex, v5.AccountId][]>
    getKeys(block: Block, key1: v5.EraIndex, key2: v5.AccountId): Promise<[v5.EraIndex, v5.AccountId][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v5.EraIndex, v5.AccountId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v5.EraIndex): AsyncIterable<[v5.EraIndex, v5.AccountId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v5.EraIndex, key2: v5.AccountId): AsyncIterable<[v5.EraIndex, v5.AccountId][]>
    getPairs(block: Block): Promise<[k: [v5.EraIndex, v5.AccountId], v: (v5.ValidatorPrefs | undefined)][]>
    getPairs(block: Block, key1: v5.EraIndex): Promise<[k: [v5.EraIndex, v5.AccountId], v: (v5.ValidatorPrefs | undefined)][]>
    getPairs(block: Block, key1: v5.EraIndex, key2: v5.AccountId): Promise<[k: [v5.EraIndex, v5.AccountId], v: (v5.ValidatorPrefs | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v5.EraIndex, v5.AccountId], v: (v5.ValidatorPrefs | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v5.EraIndex): AsyncIterable<[k: [v5.EraIndex, v5.AccountId], v: (v5.ValidatorPrefs | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v5.EraIndex, key2: v5.AccountId): AsyncIterable<[k: [v5.EraIndex, v5.AccountId], v: (v5.ValidatorPrefs | undefined)][]>
}

export const erasValidatorReward =  {
    /**
     *  The total validator era payout for the last `HISTORY_DEPTH` eras.
     * 
     *  Eras that haven't finished yet or has been removed doesn't have reward.
     */
    v5: new StorageType('Staking.ErasValidatorReward', 'Optional', [v5.EraIndex], v5.BalanceOf) as ErasValidatorRewardV5,
}

/**
 *  The total validator era payout for the last `HISTORY_DEPTH` eras.
 * 
 *  Eras that haven't finished yet or has been removed doesn't have reward.
 */
export interface ErasValidatorRewardV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v5.EraIndex): Promise<(v5.BalanceOf | undefined)>
    getMany(block: Block, keys: v5.EraIndex[]): Promise<(v5.BalanceOf | undefined)[]>
    getKeys(block: Block): Promise<v5.EraIndex[]>
    getKeys(block: Block, key: v5.EraIndex): Promise<v5.EraIndex[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.EraIndex[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.EraIndex): AsyncIterable<v5.EraIndex[]>
    getPairs(block: Block): Promise<[k: v5.EraIndex, v: (v5.BalanceOf | undefined)][]>
    getPairs(block: Block, key: v5.EraIndex): Promise<[k: v5.EraIndex, v: (v5.BalanceOf | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.EraIndex, v: (v5.BalanceOf | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.EraIndex): AsyncIterable<[k: v5.EraIndex, v: (v5.BalanceOf | undefined)][]>
}

export const erasRewardPoints =  {
    /**
     *  Rewards for the last `HISTORY_DEPTH` eras.
     *  If reward hasn't been set or has been removed then 0 reward is returned.
     */
    v5: new StorageType('Staking.ErasRewardPoints', 'Default', [v5.EraIndex], v5.EraRewardPoints) as ErasRewardPointsV5,
}

/**
 *  Rewards for the last `HISTORY_DEPTH` eras.
 *  If reward hasn't been set or has been removed then 0 reward is returned.
 */
export interface ErasRewardPointsV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.EraRewardPoints
    get(block: Block, key: v5.EraIndex): Promise<(v5.EraRewardPoints | undefined)>
    getMany(block: Block, keys: v5.EraIndex[]): Promise<(v5.EraRewardPoints | undefined)[]>
    getKeys(block: Block): Promise<v5.EraIndex[]>
    getKeys(block: Block, key: v5.EraIndex): Promise<v5.EraIndex[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.EraIndex[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.EraIndex): AsyncIterable<v5.EraIndex[]>
    getPairs(block: Block): Promise<[k: v5.EraIndex, v: (v5.EraRewardPoints | undefined)][]>
    getPairs(block: Block, key: v5.EraIndex): Promise<[k: v5.EraIndex, v: (v5.EraRewardPoints | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.EraIndex, v: (v5.EraRewardPoints | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.EraIndex): AsyncIterable<[k: v5.EraIndex, v: (v5.EraRewardPoints | undefined)][]>
}

export const erasTotalStake =  {
    /**
     *  The total amount staked for the last `HISTORY_DEPTH` eras.
     *  If total hasn't been set or has been removed then 0 stake is returned.
     */
    v5: new StorageType('Staking.ErasTotalStake', 'Default', [v5.EraIndex], v5.BalanceOf) as ErasTotalStakeV5,
}

/**
 *  The total amount staked for the last `HISTORY_DEPTH` eras.
 *  If total hasn't been set or has been removed then 0 stake is returned.
 */
export interface ErasTotalStakeV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.BalanceOf
    get(block: Block, key: v5.EraIndex): Promise<(v5.BalanceOf | undefined)>
    getMany(block: Block, keys: v5.EraIndex[]): Promise<(v5.BalanceOf | undefined)[]>
    getKeys(block: Block): Promise<v5.EraIndex[]>
    getKeys(block: Block, key: v5.EraIndex): Promise<v5.EraIndex[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.EraIndex[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.EraIndex): AsyncIterable<v5.EraIndex[]>
    getPairs(block: Block): Promise<[k: v5.EraIndex, v: (v5.BalanceOf | undefined)][]>
    getPairs(block: Block, key: v5.EraIndex): Promise<[k: v5.EraIndex, v: (v5.BalanceOf | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.EraIndex, v: (v5.BalanceOf | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.EraIndex): AsyncIterable<[k: v5.EraIndex, v: (v5.BalanceOf | undefined)][]>
}

export const forceEra =  {
    /**
     *  Mode of era forcing.
     */
    v5: new StorageType('Staking.ForceEra', 'Default', [], v5.Forcing) as ForceEraV5,
}

/**
 *  Mode of era forcing.
 */
export interface ForceEraV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.Forcing
    get(block: Block): Promise<(v5.Forcing | undefined)>
}

export const slashRewardFraction =  {
    /**
     *  The percentage of the slash that is distributed to reporters.
     * 
     *  The rest of the slashed value is handled by the `Slash`.
     */
    v5: new StorageType('Staking.SlashRewardFraction', 'Default', [], v5.Perbill) as SlashRewardFractionV5,
}

/**
 *  The percentage of the slash that is distributed to reporters.
 * 
 *  The rest of the slashed value is handled by the `Slash`.
 */
export interface SlashRewardFractionV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.Perbill
    get(block: Block): Promise<(v5.Perbill | undefined)>
}

export const canceledSlashPayout =  {
    /**
     *  The amount of currency given to reporters of a slash event which was
     *  canceled by extraordinary circumstances (e.g. governance).
     */
    v5: new StorageType('Staking.CanceledSlashPayout', 'Default', [], v5.BalanceOf) as CanceledSlashPayoutV5,
}

/**
 *  The amount of currency given to reporters of a slash event which was
 *  canceled by extraordinary circumstances (e.g. governance).
 */
export interface CanceledSlashPayoutV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.BalanceOf
    get(block: Block): Promise<(v5.BalanceOf | undefined)>
}

export const unappliedSlashes =  {
    /**
     *  All unapplied slashes that are queued for later.
     */
    v5: new StorageType('Staking.UnappliedSlashes', 'Default', [v5.EraIndex], sts.array(() => v5.UnappliedSlash)) as UnappliedSlashesV5,
}

/**
 *  All unapplied slashes that are queued for later.
 */
export interface UnappliedSlashesV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.UnappliedSlash[]
    get(block: Block, key: v5.EraIndex): Promise<(v5.UnappliedSlash[] | undefined)>
    getMany(block: Block, keys: v5.EraIndex[]): Promise<(v5.UnappliedSlash[] | undefined)[]>
    getKeys(block: Block): Promise<v5.EraIndex[]>
    getKeys(block: Block, key: v5.EraIndex): Promise<v5.EraIndex[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.EraIndex[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.EraIndex): AsyncIterable<v5.EraIndex[]>
    getPairs(block: Block): Promise<[k: v5.EraIndex, v: (v5.UnappliedSlash[] | undefined)][]>
    getPairs(block: Block, key: v5.EraIndex): Promise<[k: v5.EraIndex, v: (v5.UnappliedSlash[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.EraIndex, v: (v5.UnappliedSlash[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.EraIndex): AsyncIterable<[k: v5.EraIndex, v: (v5.UnappliedSlash[] | undefined)][]>
}

export const bondedEras =  {
    /**
     *  A mapping from still-bonded eras to the first session index of that era.
     * 
     *  Must contains information for eras for the range:
     *  `[active_era - bounding_duration; active_era]`
     */
    v5: new StorageType('Staking.BondedEras', 'Default', [], sts.array(() => sts.tuple(() => [v5.EraIndex, v5.SessionIndex]))) as BondedErasV5,
}

/**
 *  A mapping from still-bonded eras to the first session index of that era.
 * 
 *  Must contains information for eras for the range:
 *  `[active_era - bounding_duration; active_era]`
 */
export interface BondedErasV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): [v5.EraIndex, v5.SessionIndex][]
    get(block: Block): Promise<([v5.EraIndex, v5.SessionIndex][] | undefined)>
}

export const validatorSlashInEra =  {
    /**
     *  All slashing events on validators, mapped by era to the highest slash proportion
     *  and slash value of the era.
     */
    v5: new StorageType('Staking.ValidatorSlashInEra', 'Optional', [v5.EraIndex, v5.AccountId], sts.tuple(() => [v5.Perbill, v5.BalanceOf])) as ValidatorSlashInEraV5,
}

/**
 *  All slashing events on validators, mapped by era to the highest slash proportion
 *  and slash value of the era.
 */
export interface ValidatorSlashInEraV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: v5.EraIndex, key2: v5.AccountId): Promise<([v5.Perbill, v5.BalanceOf] | undefined)>
    getMany(block: Block, keys: [v5.EraIndex, v5.AccountId][]): Promise<([v5.Perbill, v5.BalanceOf] | undefined)[]>
    getKeys(block: Block): Promise<[v5.EraIndex, v5.AccountId][]>
    getKeys(block: Block, key1: v5.EraIndex): Promise<[v5.EraIndex, v5.AccountId][]>
    getKeys(block: Block, key1: v5.EraIndex, key2: v5.AccountId): Promise<[v5.EraIndex, v5.AccountId][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v5.EraIndex, v5.AccountId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v5.EraIndex): AsyncIterable<[v5.EraIndex, v5.AccountId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v5.EraIndex, key2: v5.AccountId): AsyncIterable<[v5.EraIndex, v5.AccountId][]>
    getPairs(block: Block): Promise<[k: [v5.EraIndex, v5.AccountId], v: ([v5.Perbill, v5.BalanceOf] | undefined)][]>
    getPairs(block: Block, key1: v5.EraIndex): Promise<[k: [v5.EraIndex, v5.AccountId], v: ([v5.Perbill, v5.BalanceOf] | undefined)][]>
    getPairs(block: Block, key1: v5.EraIndex, key2: v5.AccountId): Promise<[k: [v5.EraIndex, v5.AccountId], v: ([v5.Perbill, v5.BalanceOf] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v5.EraIndex, v5.AccountId], v: ([v5.Perbill, v5.BalanceOf] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v5.EraIndex): AsyncIterable<[k: [v5.EraIndex, v5.AccountId], v: ([v5.Perbill, v5.BalanceOf] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v5.EraIndex, key2: v5.AccountId): AsyncIterable<[k: [v5.EraIndex, v5.AccountId], v: ([v5.Perbill, v5.BalanceOf] | undefined)][]>
}

export const nominatorSlashInEra =  {
    /**
     *  All slashing events on nominators, mapped by era to the highest slash value of the era.
     */
    v5: new StorageType('Staking.NominatorSlashInEra', 'Optional', [v5.EraIndex, v5.AccountId], v5.BalanceOf) as NominatorSlashInEraV5,
}

/**
 *  All slashing events on nominators, mapped by era to the highest slash value of the era.
 */
export interface NominatorSlashInEraV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: v5.EraIndex, key2: v5.AccountId): Promise<(v5.BalanceOf | undefined)>
    getMany(block: Block, keys: [v5.EraIndex, v5.AccountId][]): Promise<(v5.BalanceOf | undefined)[]>
    getKeys(block: Block): Promise<[v5.EraIndex, v5.AccountId][]>
    getKeys(block: Block, key1: v5.EraIndex): Promise<[v5.EraIndex, v5.AccountId][]>
    getKeys(block: Block, key1: v5.EraIndex, key2: v5.AccountId): Promise<[v5.EraIndex, v5.AccountId][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v5.EraIndex, v5.AccountId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v5.EraIndex): AsyncIterable<[v5.EraIndex, v5.AccountId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v5.EraIndex, key2: v5.AccountId): AsyncIterable<[v5.EraIndex, v5.AccountId][]>
    getPairs(block: Block): Promise<[k: [v5.EraIndex, v5.AccountId], v: (v5.BalanceOf | undefined)][]>
    getPairs(block: Block, key1: v5.EraIndex): Promise<[k: [v5.EraIndex, v5.AccountId], v: (v5.BalanceOf | undefined)][]>
    getPairs(block: Block, key1: v5.EraIndex, key2: v5.AccountId): Promise<[k: [v5.EraIndex, v5.AccountId], v: (v5.BalanceOf | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v5.EraIndex, v5.AccountId], v: (v5.BalanceOf | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v5.EraIndex): AsyncIterable<[k: [v5.EraIndex, v5.AccountId], v: (v5.BalanceOf | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v5.EraIndex, key2: v5.AccountId): AsyncIterable<[k: [v5.EraIndex, v5.AccountId], v: (v5.BalanceOf | undefined)][]>
}

export const slashingSpans =  {
    /**
     *  Slashing spans for stash accounts.
     */
    v5: new StorageType('Staking.SlashingSpans', 'Optional', [v5.AccountId], v5.SlashingSpans) as SlashingSpansV5,
}

/**
 *  Slashing spans for stash accounts.
 */
export interface SlashingSpansV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v5.AccountId): Promise<(v5.SlashingSpans | undefined)>
    getMany(block: Block, keys: v5.AccountId[]): Promise<(v5.SlashingSpans | undefined)[]>
    getKeys(block: Block): Promise<v5.AccountId[]>
    getKeys(block: Block, key: v5.AccountId): Promise<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.AccountId[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<v5.AccountId[]>
    getPairs(block: Block): Promise<[k: v5.AccountId, v: (v5.SlashingSpans | undefined)][]>
    getPairs(block: Block, key: v5.AccountId): Promise<[k: v5.AccountId, v: (v5.SlashingSpans | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.AccountId, v: (v5.SlashingSpans | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.AccountId): AsyncIterable<[k: v5.AccountId, v: (v5.SlashingSpans | undefined)][]>
}

export const spanSlash =  {
    /**
     *  Records information about the maximum slash of a stash within a slashing span,
     *  as well as how much reward has been paid out.
     */
    v5: new StorageType('Staking.SpanSlash', 'Default', [sts.tuple(() => [v5.AccountId, v5.SpanIndex])], v5.SpanRecord) as SpanSlashV5,
}

/**
 *  Records information about the maximum slash of a stash within a slashing span,
 *  as well as how much reward has been paid out.
 */
export interface SpanSlashV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.SpanRecord
    get(block: Block, key: [v5.AccountId, v5.SpanIndex]): Promise<(v5.SpanRecord | undefined)>
    getMany(block: Block, keys: [v5.AccountId, v5.SpanIndex][]): Promise<(v5.SpanRecord | undefined)[]>
    getKeys(block: Block): Promise<[v5.AccountId, v5.SpanIndex][]>
    getKeys(block: Block, key: [v5.AccountId, v5.SpanIndex]): Promise<[v5.AccountId, v5.SpanIndex][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v5.AccountId, v5.SpanIndex][]>
    getKeysPaged(pageSize: number, block: Block, key: [v5.AccountId, v5.SpanIndex]): AsyncIterable<[v5.AccountId, v5.SpanIndex][]>
    getPairs(block: Block): Promise<[k: [v5.AccountId, v5.SpanIndex], v: (v5.SpanRecord | undefined)][]>
    getPairs(block: Block, key: [v5.AccountId, v5.SpanIndex]): Promise<[k: [v5.AccountId, v5.SpanIndex], v: (v5.SpanRecord | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v5.AccountId, v5.SpanIndex], v: (v5.SpanRecord | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: [v5.AccountId, v5.SpanIndex]): AsyncIterable<[k: [v5.AccountId, v5.SpanIndex], v: (v5.SpanRecord | undefined)][]>
}

export const earliestUnappliedSlash =  {
    /**
     *  The earliest era for which we have a pending, unapplied slash.
     */
    v5: new StorageType('Staking.EarliestUnappliedSlash', 'Optional', [], v5.EraIndex) as EarliestUnappliedSlashV5,
}

/**
 *  The earliest era for which we have a pending, unapplied slash.
 */
export interface EarliestUnappliedSlashV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v5.EraIndex | undefined)>
}

export const snapshotValidators =  {
    /**
     *  Snapshot of validators at the beginning of the current election window. This should only
     *  have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.
     */
    v5: new StorageType('Staking.SnapshotValidators', 'Optional', [], sts.array(() => v5.AccountId)) as SnapshotValidatorsV5,
}

/**
 *  Snapshot of validators at the beginning of the current election window. This should only
 *  have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.
 */
export interface SnapshotValidatorsV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v5.AccountId[] | undefined)>
}

export const snapshotNominators =  {
    /**
     *  Snapshot of nominators at the beginning of the current election window. This should only
     *  have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.
     */
    v5: new StorageType('Staking.SnapshotNominators', 'Optional', [], sts.array(() => v5.AccountId)) as SnapshotNominatorsV5,
}

/**
 *  Snapshot of nominators at the beginning of the current election window. This should only
 *  have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.
 */
export interface SnapshotNominatorsV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v5.AccountId[] | undefined)>
}

export const queuedElected =  {
    /**
     *  The next validator set. At the end of an era, if this is available (potentially from the
     *  result of an offchain worker), it is immediately used. Otherwise, the on-chain election
     *  is executed.
     */
    v5: new StorageType('Staking.QueuedElected', 'Optional', [], v5.ElectionResult) as QueuedElectedV5,
}

/**
 *  The next validator set. At the end of an era, if this is available (potentially from the
 *  result of an offchain worker), it is immediately used. Otherwise, the on-chain election
 *  is executed.
 */
export interface QueuedElectedV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v5.ElectionResult | undefined)>
}

export const queuedScore =  {
    /**
     *  The score of the current [`QueuedElected`].
     */
    v5: new StorageType('Staking.QueuedScore', 'Optional', [], v5.ElectionScore) as QueuedScoreV5,
}

/**
 *  The score of the current [`QueuedElected`].
 */
export interface QueuedScoreV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v5.ElectionScore | undefined)>
}

export const eraElectionStatus =  {
    /**
     *  Flag to control the execution of the offchain election. When `Open(_)`, we accept
     *  solutions to be submitted.
     */
    v5: new StorageType('Staking.EraElectionStatus', 'Default', [], v5.ElectionStatus) as EraElectionStatusV5,
}

/**
 *  Flag to control the execution of the offchain election. When `Open(_)`, we accept
 *  solutions to be submitted.
 */
export interface EraElectionStatusV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.ElectionStatus
    get(block: Block): Promise<(v5.ElectionStatus | undefined)>
}

export const isCurrentSessionFinal =  {
    /**
     *  True if the current **planned** session is final. Note that this does not take era
     *  forcing into account.
     */
    v5: new StorageType('Staking.IsCurrentSessionFinal', 'Default', [], sts.boolean()) as IsCurrentSessionFinalV5,
}

/**
 *  True if the current **planned** session is final. Note that this does not take era
 *  forcing into account.
 */
export interface IsCurrentSessionFinalV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): boolean
    get(block: Block): Promise<(boolean | undefined)>
}

export const storageVersion =  {
    /**
     *  True if network has been upgraded to this version.
     *  Storage version of the pallet.
     * 
     *  This is set to v5.0.0 for new networks.
     */
    v5: new StorageType('Staking.StorageVersion', 'Default', [], v5.Releases) as StorageVersionV5,
}

/**
 *  True if network has been upgraded to this version.
 *  Storage version of the pallet.
 * 
 *  This is set to v5.0.0 for new networks.
 */
export interface StorageVersionV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v5.Releases
    get(block: Block): Promise<(v5.Releases | undefined)>
}

export const minNominatorBond =  {
    /**
     *  The minimum active bond to become and maintain the role of a nominator.
     */
    v8: new StorageType('Staking.MinNominatorBond', 'Default', [], v8.BalanceOf) as MinNominatorBondV8,
}

/**
 *  The minimum active bond to become and maintain the role of a nominator.
 */
export interface MinNominatorBondV8  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v8.BalanceOf
    get(block: Block): Promise<(v8.BalanceOf | undefined)>
}

export const minValidatorBond =  {
    /**
     *  The minimum active bond to become and maintain the role of a validator.
     */
    v8: new StorageType('Staking.MinValidatorBond', 'Default', [], v8.BalanceOf) as MinValidatorBondV8,
}

/**
 *  The minimum active bond to become and maintain the role of a validator.
 */
export interface MinValidatorBondV8  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v8.BalanceOf
    get(block: Block): Promise<(v8.BalanceOf | undefined)>
}

export const counterForValidators =  {
    /**
     *  A tracker to keep count of the number of items in the `Validators` map.
     */
    v8: new StorageType('Staking.CounterForValidators', 'Default', [], sts.number()) as CounterForValidatorsV8,
}

/**
 *  A tracker to keep count of the number of items in the `Validators` map.
 */
export interface CounterForValidatorsV8  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number
    get(block: Block): Promise<(number | undefined)>
}

export const maxValidatorsCount =  {
    /**
     *  The maximum validator count before we stop allowing new validators to join.
     * 
     *  When this value is not set, no limits are enforced.
     */
    v8: new StorageType('Staking.MaxValidatorsCount', 'Optional', [], sts.number()) as MaxValidatorsCountV8,
}

/**
 *  The maximum validator count before we stop allowing new validators to join.
 * 
 *  When this value is not set, no limits are enforced.
 */
export interface MaxValidatorsCountV8  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(number | undefined)>
}

export const counterForNominators =  {
    /**
     *  A tracker to keep count of the number of items in the `Nominators` map.
     */
    v8: new StorageType('Staking.CounterForNominators', 'Default', [], sts.number()) as CounterForNominatorsV8,
}

/**
 *  A tracker to keep count of the number of items in the `Nominators` map.
 */
export interface CounterForNominatorsV8  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number
    get(block: Block): Promise<(number | undefined)>
}

export const maxNominatorsCount =  {
    /**
     *  The maximum nominator count before we stop allowing new validators to join.
     * 
     *  When this value is not set, no limits are enforced.
     */
    v8: new StorageType('Staking.MaxNominatorsCount', 'Optional', [], sts.number()) as MaxNominatorsCountV8,
}

/**
 *  The maximum nominator count before we stop allowing new validators to join.
 * 
 *  When this value is not set, no limits are enforced.
 */
export interface MaxNominatorsCountV8  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(number | undefined)>
}

export const currentPlannedSession =  {
    /**
     *  The last planned session scheduled by the session pallet.
     * 
     *  This is basically in sync with the call to [`pallet_session::SessionManager::new_session`].
     */
    v8: new StorageType('Staking.CurrentPlannedSession', 'Default', [], v8.SessionIndex) as CurrentPlannedSessionV8,
}

/**
 *  The last planned session scheduled by the session pallet.
 * 
 *  This is basically in sync with the call to [`pallet_session::SessionManager::new_session`].
 */
export interface CurrentPlannedSessionV8  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v8.SessionIndex
    get(block: Block): Promise<(v8.SessionIndex | undefined)>
}

export const chillThreshold =  {
    /**
     *  The threshold for when users can start calling `chill_other` for other validators / nominators.
     *  The threshold is compared to the actual number of validators / nominators (`CountFor*`) in
     *  the system compared to the configured max (`Max*Count`).
     */
    v8: new StorageType('Staking.ChillThreshold', 'Optional', [], v8.Percent) as ChillThresholdV8,
}

/**
 *  The threshold for when users can start calling `chill_other` for other validators / nominators.
 *  The threshold is compared to the actual number of validators / nominators (`CountFor*`) in
 *  the system compared to the configured max (`Max*Count`).
 */
export interface ChillThresholdV8  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v8.Percent | undefined)>
}
