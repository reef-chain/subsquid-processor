import {sts, Result, Option, Bytes, BitSequence} from './support'

export interface RegistrarInfo {
    account: AccountId
    fee: Balance
    fields: bigint
}

export const RegistrarInfo: sts.Type<RegistrarInfo> = sts.struct(() => {
    return  {
        account: AccountId,
        fee: Balance,
        fields: sts.bigint(),
    }
})

export type Data = Data_BlakeTwo256 | Data_Keccak256 | Data_None | Data_Raw0 | Data_Raw1 | Data_Raw10 | Data_Raw11 | Data_Raw12 | Data_Raw13 | Data_Raw14 | Data_Raw15 | Data_Raw16 | Data_Raw17 | Data_Raw18 | Data_Raw19 | Data_Raw2 | Data_Raw20 | Data_Raw21 | Data_Raw22 | Data_Raw23 | Data_Raw24 | Data_Raw25 | Data_Raw26 | Data_Raw27 | Data_Raw28 | Data_Raw29 | Data_Raw3 | Data_Raw30 | Data_Raw31 | Data_Raw32 | Data_Raw4 | Data_Raw5 | Data_Raw6 | Data_Raw7 | Data_Raw8 | Data_Raw9 | Data_Sha256 | Data_ShaThree256

export interface Data_BlakeTwo256 {
    __kind: 'BlakeTwo256'
    value: H256
}

export interface Data_Keccak256 {
    __kind: 'Keccak256'
    value: H256
}

export interface Data_None {
    __kind: 'None'
}

export interface Data_Raw0 {
    __kind: 'Raw0'
    value: Bytes
}

export interface Data_Raw1 {
    __kind: 'Raw1'
    value: Bytes
}

export interface Data_Raw10 {
    __kind: 'Raw10'
    value: Bytes
}

export interface Data_Raw11 {
    __kind: 'Raw11'
    value: Bytes
}

export interface Data_Raw12 {
    __kind: 'Raw12'
    value: Bytes
}

export interface Data_Raw13 {
    __kind: 'Raw13'
    value: Bytes
}

export interface Data_Raw14 {
    __kind: 'Raw14'
    value: Bytes
}

export interface Data_Raw15 {
    __kind: 'Raw15'
    value: Bytes
}

export interface Data_Raw16 {
    __kind: 'Raw16'
    value: Bytes
}

export interface Data_Raw17 {
    __kind: 'Raw17'
    value: Bytes
}

export interface Data_Raw18 {
    __kind: 'Raw18'
    value: Bytes
}

export interface Data_Raw19 {
    __kind: 'Raw19'
    value: Bytes
}

export interface Data_Raw2 {
    __kind: 'Raw2'
    value: Bytes
}

export interface Data_Raw20 {
    __kind: 'Raw20'
    value: Bytes
}

export interface Data_Raw21 {
    __kind: 'Raw21'
    value: Bytes
}

export interface Data_Raw22 {
    __kind: 'Raw22'
    value: Bytes
}

export interface Data_Raw23 {
    __kind: 'Raw23'
    value: Bytes
}

export interface Data_Raw24 {
    __kind: 'Raw24'
    value: Bytes
}

export interface Data_Raw25 {
    __kind: 'Raw25'
    value: Bytes
}

export interface Data_Raw26 {
    __kind: 'Raw26'
    value: Bytes
}

export interface Data_Raw27 {
    __kind: 'Raw27'
    value: Bytes
}

export interface Data_Raw28 {
    __kind: 'Raw28'
    value: Bytes
}

export interface Data_Raw29 {
    __kind: 'Raw29'
    value: Bytes
}

export interface Data_Raw3 {
    __kind: 'Raw3'
    value: Bytes
}

export interface Data_Raw30 {
    __kind: 'Raw30'
    value: Bytes
}

export interface Data_Raw31 {
    __kind: 'Raw31'
    value: Bytes
}

export interface Data_Raw32 {
    __kind: 'Raw32'
    value: Bytes
}

export interface Data_Raw4 {
    __kind: 'Raw4'
    value: Bytes
}

export interface Data_Raw5 {
    __kind: 'Raw5'
    value: Bytes
}

export interface Data_Raw6 {
    __kind: 'Raw6'
    value: Bytes
}

export interface Data_Raw7 {
    __kind: 'Raw7'
    value: Bytes
}

export interface Data_Raw8 {
    __kind: 'Raw8'
    value: Bytes
}

export interface Data_Raw9 {
    __kind: 'Raw9'
    value: Bytes
}

export interface Data_Sha256 {
    __kind: 'Sha256'
    value: H256
}

export interface Data_ShaThree256 {
    __kind: 'ShaThree256'
    value: H256
}

export const Data: sts.Type<Data> = sts.closedEnum(() => {
    return  {
        BlakeTwo256: H256,
        Keccak256: H256,
        None: sts.unit(),
        Raw0: sts.bytes(),
        Raw1: sts.bytes(),
        Raw10: sts.bytes(),
        Raw11: sts.bytes(),
        Raw12: sts.bytes(),
        Raw13: sts.bytes(),
        Raw14: sts.bytes(),
        Raw15: sts.bytes(),
        Raw16: sts.bytes(),
        Raw17: sts.bytes(),
        Raw18: sts.bytes(),
        Raw19: sts.bytes(),
        Raw2: sts.bytes(),
        Raw20: sts.bytes(),
        Raw21: sts.bytes(),
        Raw22: sts.bytes(),
        Raw23: sts.bytes(),
        Raw24: sts.bytes(),
        Raw25: sts.bytes(),
        Raw26: sts.bytes(),
        Raw27: sts.bytes(),
        Raw28: sts.bytes(),
        Raw29: sts.bytes(),
        Raw3: sts.bytes(),
        Raw30: sts.bytes(),
        Raw31: sts.bytes(),
        Raw32: sts.bytes(),
        Raw4: sts.bytes(),
        Raw5: sts.bytes(),
        Raw6: sts.bytes(),
        Raw7: sts.bytes(),
        Raw8: sts.bytes(),
        Raw9: sts.bytes(),
        Sha256: H256,
        ShaThree256: H256,
    }
})

export interface Registration {
    judgements: RegistrationJudgement[]
    deposit: Balance
    info: IdentityInfo
}

export interface IdentityInfo {
    additional: IdentityInfoAdditional[]
    display: Data
    legal: Data
    web: Data
    riot: Data
    email: Data
    pgpFingerprint?: (H160 | undefined)
    image: Data
    twitter: Data
}

export type H160 = Bytes

export type IdentityInfoAdditional = [Data, Data]

export type RegistrationJudgement = [RegistrarIndex, IdentityJudgement]

export type IdentityJudgement = IdentityJudgement_Erroneous | IdentityJudgement_FeePaid | IdentityJudgement_KnownGood | IdentityJudgement_LowQuality | IdentityJudgement_OutOfDate | IdentityJudgement_Reasonable | IdentityJudgement_Unknown

export interface IdentityJudgement_Erroneous {
    __kind: 'Erroneous'
}

export interface IdentityJudgement_FeePaid {
    __kind: 'FeePaid'
    value: Balance
}

export interface IdentityJudgement_KnownGood {
    __kind: 'KnownGood'
}

export interface IdentityJudgement_LowQuality {
    __kind: 'LowQuality'
}

export interface IdentityJudgement_OutOfDate {
    __kind: 'OutOfDate'
}

export interface IdentityJudgement_Reasonable {
    __kind: 'Reasonable'
}

export interface IdentityJudgement_Unknown {
    __kind: 'Unknown'
}

export type RegistrarIndex = number

export const Registration: sts.Type<Registration> = sts.struct(() => {
    return  {
        judgements: sts.array(() => RegistrationJudgement),
        deposit: Balance,
        info: IdentityInfo,
    }
})

export const IdentityInfo: sts.Type<IdentityInfo> = sts.struct(() => {
    return  {
        additional: sts.array(() => IdentityInfoAdditional),
        display: Data,
        legal: Data,
        web: Data,
        riot: Data,
        email: Data,
        pgpFingerprint: sts.option(() => H160),
        image: Data,
        twitter: Data,
    }
})

export const H160 = sts.bytes()

export const IdentityInfoAdditional = sts.tuple(() => [Data, Data])

export const RegistrationJudgement = sts.tuple(() => [RegistrarIndex, IdentityJudgement])

export const IdentityJudgement: sts.Type<IdentityJudgement> = sts.closedEnum(() => {
    return  {
        Erroneous: sts.unit(),
        FeePaid: Balance,
        KnownGood: sts.unit(),
        LowQuality: sts.unit(),
        OutOfDate: sts.unit(),
        Reasonable: sts.unit(),
        Unknown: sts.unit(),
    }
})

export const RegistrarIndex = sts.number()

export type ElectionStatus = ElectionStatus_Close | ElectionStatus_Open

export interface ElectionStatus_Close {
    __kind: 'Close'
}

export interface ElectionStatus_Open {
    __kind: 'Open'
    value: BlockNumber
}

export const ElectionStatus: sts.Type<ElectionStatus> = sts.closedEnum(() => {
    return  {
        Close: sts.unit(),
        Open: BlockNumber,
    }
})

export type ElectionScore = bigint[]

export const ElectionScore = sts.array(() => sts.bigint())

export interface ElectionResult {
    compute: ElectionCompute
    slotStake: Balance
    electedStashes: AccountId[]
    exposures: [AccountId, Exposure][]
}

export type ElectionCompute = ElectionCompute_OnChain | ElectionCompute_Signed | ElectionCompute_Unsigned

export interface ElectionCompute_OnChain {
    __kind: 'OnChain'
}

export interface ElectionCompute_Signed {
    __kind: 'Signed'
}

export interface ElectionCompute_Unsigned {
    __kind: 'Unsigned'
}

export const ElectionResult: sts.Type<ElectionResult> = sts.struct(() => {
    return  {
        compute: ElectionCompute,
        slotStake: Balance,
        electedStashes: sts.array(() => AccountId),
        exposures: sts.array(() => sts.tuple(() => [AccountId, Exposure])),
    }
})

export const ElectionCompute: sts.Type<ElectionCompute> = sts.closedEnum(() => {
    return  {
        OnChain: sts.unit(),
        Signed: sts.unit(),
        Unsigned: sts.unit(),
    }
})

export type SpanIndex = number

export interface SpanRecord {
    slashed: Balance
    paidOut: Balance
}

export const SpanRecord: sts.Type<SpanRecord> = sts.struct(() => {
    return  {
        slashed: Balance,
        paidOut: Balance,
    }
})

export const SpanIndex = sts.number()

export interface SlashingSpans {
    spanIndex: SpanIndex
    lastStart: EraIndex
    lastNonzeroSlash: EraIndex
    prior: EraIndex[]
}

export const SlashingSpans: sts.Type<SlashingSpans> = sts.struct(() => {
    return  {
        spanIndex: SpanIndex,
        lastStart: EraIndex,
        lastNonzeroSlash: EraIndex,
        prior: sts.array(() => EraIndex),
    }
})

export interface UnappliedSlash {
    validator: AccountId
    own: Balance
    others: UnappliedSlashOther[]
    reporters: AccountId[]
    payout: Balance
}

export type UnappliedSlashOther = [AccountId, Balance]

export const UnappliedSlash: sts.Type<UnappliedSlash> = sts.struct(() => {
    return  {
        validator: AccountId,
        own: Balance,
        others: sts.array(() => UnappliedSlashOther),
        reporters: sts.array(() => AccountId),
        payout: Balance,
    }
})

export const UnappliedSlashOther = sts.tuple(() => [AccountId, Balance])

export type Perbill = number

export const Perbill = sts.number()

export type Forcing = Forcing_ForceAlways | Forcing_ForceNew | Forcing_ForceNone | Forcing_NotForcing

export interface Forcing_ForceAlways {
    __kind: 'ForceAlways'
}

export interface Forcing_ForceNew {
    __kind: 'ForceNew'
}

export interface Forcing_ForceNone {
    __kind: 'ForceNone'
}

export interface Forcing_NotForcing {
    __kind: 'NotForcing'
}

export const Forcing: sts.Type<Forcing> = sts.closedEnum(() => {
    return  {
        ForceAlways: sts.unit(),
        ForceNew: sts.unit(),
        ForceNone: sts.unit(),
        NotForcing: sts.unit(),
    }
})

export interface EraRewardPoints {
    total: RewardPoint
    individual: [AccountId, RewardPoint][]
}

export type RewardPoint = number

export const EraRewardPoints: sts.Type<EraRewardPoints> = sts.struct(() => {
    return  {
        total: RewardPoint,
        individual: sts.array(() => sts.tuple(() => [AccountId, RewardPoint])),
    }
})

export const RewardPoint = sts.number()

export type BalanceOf = bigint

export const BalanceOf = sts.bigint()

export interface Exposure {
    total: bigint
    own: bigint
    others: IndividualExposure[]
}

export interface IndividualExposure {
    who: AccountId
    value: bigint
}

export const Exposure: sts.Type<Exposure> = sts.struct(() => {
    return  {
        total: sts.bigint(),
        own: sts.bigint(),
        others: sts.array(() => IndividualExposure),
    }
})

export const IndividualExposure: sts.Type<IndividualExposure> = sts.struct(() => {
    return  {
        who: AccountId,
        value: sts.bigint(),
    }
})

export type SessionIndex = number

export const SessionIndex = sts.number()

export interface ActiveEraInfo {
    index: EraIndex
    start?: (Moment | undefined)
}

export type Moment = bigint

export const ActiveEraInfo: sts.Type<ActiveEraInfo> = sts.struct(() => {
    return  {
        index: EraIndex,
        start: sts.option(() => Moment),
    }
})

export const Moment = sts.bigint()

export type EraIndex = number

export const EraIndex = sts.number()

export interface Nominations {
    targets: AccountId[]
    submittedIn: EraIndex
    suppressed: boolean
}

export const Nominations: sts.Type<Nominations> = sts.struct(() => {
    return  {
        targets: sts.array(() => AccountId),
        submittedIn: EraIndex,
        suppressed: sts.boolean(),
    }
})

export interface ValidatorPrefs {
    commission: number
    blocked: boolean
}

export const ValidatorPrefs: sts.Type<ValidatorPrefs> = sts.struct(() => {
    return  {
        commission: sts.number(),
        blocked: sts.boolean(),
    }
})

export type RewardDestination = RewardDestination_Account | RewardDestination_Controller | RewardDestination_None | RewardDestination_Staked | RewardDestination_Stash

export interface RewardDestination_Account {
    __kind: 'Account'
    value: AccountId
}

export interface RewardDestination_Controller {
    __kind: 'Controller'
}

export interface RewardDestination_None {
    __kind: 'None'
}

export interface RewardDestination_Staked {
    __kind: 'Staked'
}

export interface RewardDestination_Stash {
    __kind: 'Stash'
}

export const RewardDestination: sts.Type<RewardDestination> = sts.closedEnum(() => {
    return  {
        Account: AccountId,
        Controller: sts.unit(),
        None: sts.unit(),
        Staked: sts.unit(),
        Stash: sts.unit(),
    }
})

export interface StakingLedger {
    stash: AccountId
    total: bigint
    active: bigint
    unlocking: UnlockChunk[]
    claimedRewards: EraIndex[]
}

export interface UnlockChunk {
    value: bigint
    era: number
}

export const StakingLedger: sts.Type<StakingLedger> = sts.struct(() => {
    return  {
        stash: AccountId,
        total: sts.bigint(),
        active: sts.bigint(),
        unlocking: sts.array(() => UnlockChunk),
        claimedRewards: sts.array(() => EraIndex),
    }
})

export const UnlockChunk: sts.Type<UnlockChunk> = sts.struct(() => {
    return  {
        value: sts.bigint(),
        era: sts.number(),
    }
})

export interface CodeInfo {
    codeSize: number
    refCount: number
}

export const CodeInfo: sts.Type<CodeInfo> = sts.struct(() => {
    return  {
        codeSize: sts.number(),
        refCount: sts.number(),
    }
})

export type H256 = Bytes

export const H256 = sts.bytes()

export interface EvmAccountInfo {
    nonce: Index
    contractInfo?: (EvmContractInfo | undefined)
    developerDeposit?: (Balance | undefined)
}

export interface EvmContractInfo {
    codeHash: H256
    maintainer: H160
    deployed: boolean
}

export type Index = number

export const EvmAccountInfo: sts.Type<EvmAccountInfo> = sts.struct(() => {
    return  {
        nonce: Index,
        contractInfo: sts.option(() => EvmContractInfo),
        developerDeposit: sts.option(() => Balance),
    }
})

export const EvmContractInfo: sts.Type<EvmContractInfo> = sts.struct(() => {
    return  {
        codeHash: H256,
        maintainer: H160,
        deployed: sts.boolean(),
    }
})

export const Index = sts.number()

export type EvmAddress = Bytes

export const EvmAddress = sts.bytes()

export type Releases = Releases_V1 | Releases_V10 | Releases_V2 | Releases_V3 | Releases_V4 | Releases_V5 | Releases_V6 | Releases_V7 | Releases_V8 | Releases_V9

export interface Releases_V1 {
    __kind: 'V1'
}

export interface Releases_V10 {
    __kind: 'V10'
}

export interface Releases_V2 {
    __kind: 'V2'
}

export interface Releases_V3 {
    __kind: 'V3'
}

export interface Releases_V4 {
    __kind: 'V4'
}

export interface Releases_V5 {
    __kind: 'V5'
}

export interface Releases_V6 {
    __kind: 'V6'
}

export interface Releases_V7 {
    __kind: 'V7'
}

export interface Releases_V8 {
    __kind: 'V8'
}

export interface Releases_V9 {
    __kind: 'V9'
}

export const Releases: sts.Type<Releases> = sts.closedEnum(() => {
    return  {
        V1: sts.unit(),
        V10: sts.unit(),
        V2: sts.unit(),
        V3: sts.unit(),
        V4: sts.unit(),
        V5: sts.unit(),
        V6: sts.unit(),
        V7: sts.unit(),
        V8: sts.unit(),
        V9: sts.unit(),
    }
})

export interface BalanceLock {
    id: LockIdentifier
    amount: Balance
    reasons: Reasons
}

export type Reasons = Reasons_All | Reasons_Fee | Reasons_Misc

export interface Reasons_All {
    __kind: 'All'
}

export interface Reasons_Fee {
    __kind: 'Fee'
}

export interface Reasons_Misc {
    __kind: 'Misc'
}

export type LockIdentifier = Bytes

export const BalanceLock: sts.Type<BalanceLock> = sts.struct(() => {
    return  {
        id: LockIdentifier,
        amount: Balance,
        reasons: Reasons,
    }
})

export const Reasons: sts.Type<Reasons> = sts.closedEnum(() => {
    return  {
        All: sts.unit(),
        Fee: sts.unit(),
        Misc: sts.unit(),
    }
})

export const LockIdentifier = sts.bytes()

export interface AccountData {
    free: Balance
    reserved: Balance
    miscFrozen: Balance
    feeFrozen: Balance
}

export const AccountData: sts.Type<AccountData> = sts.struct(() => {
    return  {
        free: Balance,
        reserved: Balance,
        miscFrozen: Balance,
        feeFrozen: Balance,
    }
})

export type Balance = bigint

export const Balance = sts.bigint()

export type Phase = Phase_ApplyExtrinsic | Phase_Finalization | Phase_Initialization

export interface Phase_ApplyExtrinsic {
    __kind: 'ApplyExtrinsic'
    value: number
}

export interface Phase_Finalization {
    __kind: 'Finalization'
}

export interface Phase_Initialization {
    __kind: 'Initialization'
}

export const Phase: sts.Type<Phase> = sts.closedEnum(() => {
    return  {
        ApplyExtrinsic: sts.number(),
        Finalization: sts.unit(),
        Initialization: sts.unit(),
    }
})

export interface LastRuntimeUpgradeInfo {
    specVersion: number
    specName: string
}

export const LastRuntimeUpgradeInfo: sts.Type<LastRuntimeUpgradeInfo> = sts.struct(() => {
    return  {
        specVersion: sts.number(),
        specName: sts.string(),
    }
})

export type EventIndex = number

export const EventIndex = sts.number()

export interface EventRecord {
    phase: Phase
    event: Type_327
    topics: Hash[]
}

export type Type_327 = Type_327_Authority | Type_327_Balances | Type_327_Currencies | Type_327_EVM | Type_327_EvmAccounts | Type_327_Grandpa | Type_327_Identity | Type_327_ImOnline | Type_327_Indices | Type_327_Offences | Type_327_Poc | Type_327_Scheduler | Type_327_Session | Type_327_Staking | Type_327_Sudo | Type_327_System | Type_327_TechCouncil | Type_327_Tokens

export interface Type_327_Authority {
    __kind: 'Authority'
    value: AuthorityEvent
}

export interface Type_327_Balances {
    __kind: 'Balances'
    value: BalancesEvent
}

export interface Type_327_Currencies {
    __kind: 'Currencies'
    value: CurrenciesEvent
}

export interface Type_327_EVM {
    __kind: 'EVM'
    value: EVMEvent
}

export interface Type_327_EvmAccounts {
    __kind: 'EvmAccounts'
    value: EvmAccountsEvent
}

export interface Type_327_Grandpa {
    __kind: 'Grandpa'
    value: GrandpaEvent
}

export interface Type_327_Identity {
    __kind: 'Identity'
    value: IdentityEvent
}

export interface Type_327_ImOnline {
    __kind: 'ImOnline'
    value: ImOnlineEvent
}

export interface Type_327_Indices {
    __kind: 'Indices'
    value: IndicesEvent
}

export interface Type_327_Offences {
    __kind: 'Offences'
    value: OffencesEvent
}

export interface Type_327_Poc {
    __kind: 'Poc'
    value: PocEvent
}

export interface Type_327_Scheduler {
    __kind: 'Scheduler'
    value: SchedulerEvent
}

export interface Type_327_Session {
    __kind: 'Session'
    value: SessionEvent
}

export interface Type_327_Staking {
    __kind: 'Staking'
    value: StakingEvent
}

export interface Type_327_Sudo {
    __kind: 'Sudo'
    value: SudoEvent
}

export interface Type_327_System {
    __kind: 'System'
    value: SystemEvent
}

export interface Type_327_TechCouncil {
    __kind: 'TechCouncil'
    value: TechCouncilEvent
}

export interface Type_327_Tokens {
    __kind: 'Tokens'
    value: TokensEvent
}

export type TokensEvent = TokensEvent_DustLost | TokensEvent_Transferred

/**
 *  An account was removed whose balance was non-zero but below
 *  ExistentialDeposit, resulting in an outright loss. \[account,
 *  currency_id, amount\]
 */
export interface TokensEvent_DustLost {
    __kind: 'DustLost'
    value: [AccountId, CurrencyId, Balance]
}

/**
 *  Token transfer success. \[currency_id, from, to, amount\]
 */
export interface TokensEvent_Transferred {
    __kind: 'Transferred'
    value: [CurrencyId, AccountId, AccountId, Balance]
}

export type CurrencyId = CurrencyId_DEXShare | CurrencyId_ERC20 | CurrencyId_Token

export interface CurrencyId_DEXShare {
    __kind: 'DEXShare'
    value: [TokenSymbol, TokenSymbol]
}

export interface CurrencyId_ERC20 {
    __kind: 'ERC20'
    value: EvmAddress
}

export interface CurrencyId_Token {
    __kind: 'Token'
    value: TokenSymbol
}

export type TokenSymbol = TokenSymbol_REEF | TokenSymbol_RUSD

export interface TokenSymbol_REEF {
    __kind: 'REEF'
}

export interface TokenSymbol_RUSD {
    __kind: 'RUSD'
}

export type TechCouncilEvent = TechCouncilEvent_Approved | TechCouncilEvent_Closed | TechCouncilEvent_Disapproved | TechCouncilEvent_Executed | TechCouncilEvent_MemberExecuted | TechCouncilEvent_Proposed | TechCouncilEvent_Voted

/**
 *  A motion was approved by the required threshold.
 *  \[proposal_hash\]
 */
export interface TechCouncilEvent_Approved {
    __kind: 'Approved'
    value: Hash
}

/**
 *  A proposal was closed because its threshold was reached or after its duration was up.
 *  \[proposal_hash, yes, no\]
 */
export interface TechCouncilEvent_Closed {
    __kind: 'Closed'
    value: [Hash, MemberCount, MemberCount]
}

/**
 *  A motion was not approved by the required threshold.
 *  \[proposal_hash\]
 */
export interface TechCouncilEvent_Disapproved {
    __kind: 'Disapproved'
    value: Hash
}

/**
 *  A motion was executed; result will be `Ok` if it returned without error.
 *  \[proposal_hash, result\]
 */
export interface TechCouncilEvent_Executed {
    __kind: 'Executed'
    value: [Hash, DispatchResult]
}

/**
 *  A single member did some action; result will be `Ok` if it returned without error.
 *  \[proposal_hash, result\]
 */
export interface TechCouncilEvent_MemberExecuted {
    __kind: 'MemberExecuted'
    value: [Hash, DispatchResult]
}

/**
 *  A motion (given hash) has been proposed (by given account) with a threshold (given
 *  `MemberCount`).
 *  \[account, proposal_index, proposal_hash, threshold\]
 */
export interface TechCouncilEvent_Proposed {
    __kind: 'Proposed'
    value: [AccountId, ProposalIndex, Hash, MemberCount]
}

/**
 *  A motion (given hash) has been voted on by given account, leaving
 *  a tally (yes votes and no votes given respectively as `MemberCount`).
 *  \[account, proposal_hash, voted, yes, no\]
 */
export interface TechCouncilEvent_Voted {
    __kind: 'Voted'
    value: [AccountId, Hash, boolean, MemberCount, MemberCount]
}

export type ProposalIndex = number

export type DispatchResult = Result<null, DispatchError>

export type DispatchError = DispatchError_Arithmetic | DispatchError_BadOrigin | DispatchError_CannotLookup | DispatchError_ConsumerRemaining | DispatchError_Module | DispatchError_NoProviders | DispatchError_Other | DispatchError_Token

export interface DispatchError_Arithmetic {
    __kind: 'Arithmetic'
    value: ArithmeticError
}

export interface DispatchError_BadOrigin {
    __kind: 'BadOrigin'
}

export interface DispatchError_CannotLookup {
    __kind: 'CannotLookup'
}

export interface DispatchError_ConsumerRemaining {
    __kind: 'ConsumerRemaining'
}

export interface DispatchError_Module {
    __kind: 'Module'
    value: DispatchErrorModule
}

export interface DispatchError_NoProviders {
    __kind: 'NoProviders'
}

export interface DispatchError_Other {
    __kind: 'Other'
}

export interface DispatchError_Token {
    __kind: 'Token'
    value: TokenError
}

export type TokenError = TokenError_BelowMinimum | TokenError_CannotCreate | TokenError_Frozen | TokenError_NoFunds | TokenError_Overflow | TokenError_Underflow | TokenError_UnknownAsset | TokenError_WouldDie

export interface TokenError_BelowMinimum {
    __kind: 'BelowMinimum'
}

export interface TokenError_CannotCreate {
    __kind: 'CannotCreate'
}

export interface TokenError_Frozen {
    __kind: 'Frozen'
}

export interface TokenError_NoFunds {
    __kind: 'NoFunds'
}

export interface TokenError_Overflow {
    __kind: 'Overflow'
}

export interface TokenError_Underflow {
    __kind: 'Underflow'
}

export interface TokenError_UnknownAsset {
    __kind: 'UnknownAsset'
}

export interface TokenError_WouldDie {
    __kind: 'WouldDie'
}

export interface DispatchErrorModule {
    index: number
    error: number
}

export type ArithmeticError = ArithmeticError_DivisionByZero | ArithmeticError_Overflow | ArithmeticError_Underflow

export interface ArithmeticError_DivisionByZero {
    __kind: 'DivisionByZero'
}

export interface ArithmeticError_Overflow {
    __kind: 'Overflow'
}

export interface ArithmeticError_Underflow {
    __kind: 'Underflow'
}

export type MemberCount = number

export type SystemEvent = SystemEvent_CodeUpdated | SystemEvent_ExtrinsicFailed | SystemEvent_ExtrinsicSuccess | SystemEvent_KilledAccount | SystemEvent_NewAccount

/**
 *  `:code` was updated.
 */
export interface SystemEvent_CodeUpdated {
    __kind: 'CodeUpdated'
}

/**
 *  An extrinsic failed. \[error, info\]
 */
export interface SystemEvent_ExtrinsicFailed {
    __kind: 'ExtrinsicFailed'
    value: [DispatchError, DispatchInfo]
}

/**
 *  An extrinsic completed successfully. \[info\]
 */
export interface SystemEvent_ExtrinsicSuccess {
    __kind: 'ExtrinsicSuccess'
    value: DispatchInfo
}

/**
 *  An \[account\] was reaped.
 */
export interface SystemEvent_KilledAccount {
    __kind: 'KilledAccount'
    value: AccountId
}

/**
 *  A new \[account\] was created.
 */
export interface SystemEvent_NewAccount {
    __kind: 'NewAccount'
    value: AccountId
}

export interface DispatchInfo {
    weight: Weight
    class: DispatchClass
    paysFee: Pays
}

export type Pays = Pays_No | Pays_Yes

export interface Pays_No {
    __kind: 'No'
}

export interface Pays_Yes {
    __kind: 'Yes'
}

export type DispatchClass = DispatchClass_Mandatory | DispatchClass_Normal | DispatchClass_Operational

export interface DispatchClass_Mandatory {
    __kind: 'Mandatory'
}

export interface DispatchClass_Normal {
    __kind: 'Normal'
}

export interface DispatchClass_Operational {
    __kind: 'Operational'
}

export type Weight = bigint

export type SudoEvent = SudoEvent_KeyChanged | SudoEvent_Sudid | SudoEvent_SudoAsDone

/**
 *  The \[sudoer\] just switched identity; the old key is supplied.
 */
export interface SudoEvent_KeyChanged {
    __kind: 'KeyChanged'
    value: AccountId
}

/**
 *  A sudo just took place. \[result\]
 */
export interface SudoEvent_Sudid {
    __kind: 'Sudid'
    value: DispatchResult
}

/**
 *  A sudo just took place. \[result\]
 */
export interface SudoEvent_SudoAsDone {
    __kind: 'SudoAsDone'
    value: DispatchResult
}

export type StakingEvent = StakingEvent_Bonded | StakingEvent_EraPayout | StakingEvent_Kicked | StakingEvent_OldSlashingReportDiscarded | StakingEvent_Reward | StakingEvent_Slash | StakingEvent_SolutionStored | StakingEvent_StakingElection | StakingEvent_Unbonded | StakingEvent_Withdrawn

/**
 *  An account has bonded this amount. \[stash, amount\]
 * 
 *  NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
 *  it will not be emitted for staking rewards when they are added to stake.
 */
export interface StakingEvent_Bonded {
    __kind: 'Bonded'
    value: [AccountId, Balance]
}

/**
 *  The era payout has been set; the first balance is the validator-payout; the second is
 *  the remainder from the maximum amount of reward.
 *  \[era_index, validator_payout, remainder\]
 */
export interface StakingEvent_EraPayout {
    __kind: 'EraPayout'
    value: [EraIndex, Balance, Balance]
}

/**
 *  A nominator has been kicked from a validator. \[nominator, stash\]
 */
export interface StakingEvent_Kicked {
    __kind: 'Kicked'
    value: [AccountId, AccountId]
}

/**
 *  An old slashing report from a prior era was discarded because it could
 *  not be processed. \[session_index\]
 */
export interface StakingEvent_OldSlashingReportDiscarded {
    __kind: 'OldSlashingReportDiscarded'
    value: SessionIndex
}

/**
 *  The staker has been rewarded by this amount. \[stash, amount\]
 */
export interface StakingEvent_Reward {
    __kind: 'Reward'
    value: [AccountId, Balance]
}

/**
 *  One validator (and its nominators) has been slashed by the given amount.
 *  \[validator, amount\]
 */
export interface StakingEvent_Slash {
    __kind: 'Slash'
    value: [AccountId, Balance]
}

/**
 *  A new solution for the upcoming election has been stored. \[compute\]
 */
export interface StakingEvent_SolutionStored {
    __kind: 'SolutionStored'
    value: ElectionCompute
}

/**
 *  A new set of stakers was elected with the given \[compute\].
 */
export interface StakingEvent_StakingElection {
    __kind: 'StakingElection'
    value: ElectionCompute
}

/**
 *  An account has unbonded this amount. \[stash, amount\]
 */
export interface StakingEvent_Unbonded {
    __kind: 'Unbonded'
    value: [AccountId, Balance]
}

/**
 *  An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
 *  from the unlocking queue. \[stash, amount\]
 */
export interface StakingEvent_Withdrawn {
    __kind: 'Withdrawn'
    value: [AccountId, Balance]
}

export type SessionEvent = SessionEvent_NewSession

/**
 *  New session has happened. Note that the argument is the \[session_index\], not the block
 *  number as the type might suggest.
 */
export interface SessionEvent_NewSession {
    __kind: 'NewSession'
    value: SessionIndex
}

export type SchedulerEvent = SchedulerEvent_Canceled | SchedulerEvent_Dispatched | SchedulerEvent_Scheduled

/**
 *  Canceled some task. \[when, index\]
 */
export interface SchedulerEvent_Canceled {
    __kind: 'Canceled'
    value: [BlockNumber, number]
}

/**
 *  Dispatched some task. \[task, id, result\]
 */
export interface SchedulerEvent_Dispatched {
    __kind: 'Dispatched'
    value: [TaskAddress, (Bytes | undefined), DispatchResult]
}

/**
 *  Scheduled some task. \[when, index\]
 */
export interface SchedulerEvent_Scheduled {
    __kind: 'Scheduled'
    value: [BlockNumber, number]
}

export type TaskAddress = [BlockNumber, number]

export type PocEvent = PocEvent_BondWithdrawn | PocEvent_CandidateAdded | PocEvent_CandidateRemoved | PocEvent_Committed | PocEvent_Elected | PocEvent_FundsAdded | PocEvent_UnbondingStarted | PocEvent_Voted | PocEvent_VoterRewarded

/**
 *  Bond has been withdrawn
 */
export interface PocEvent_BondWithdrawn {
    __kind: 'BondWithdrawn'
    value: [AccountId, BalanceOf]
}

/**
 *  Start candidacy
 */
export interface PocEvent_CandidateAdded {
    __kind: 'CandidateAdded'
    value: AccountId
}

/**
 *  Stop candidacy
 */
export interface PocEvent_CandidateRemoved {
    __kind: 'CandidateRemoved'
    value: AccountId
}

/**
 *  Created a new committment
 */
export interface PocEvent_Committed {
    __kind: 'Committed'
    value: [AccountId, BalanceOf]
}

/**
 *  Era, Winner,Weight
 */
export interface PocEvent_Elected {
    __kind: 'Elected'
    value: [EraIndex, AccountId, BalanceOf]
}

/**
 *  Add more funds to existing commitment
 */
export interface PocEvent_FundsAdded {
    __kind: 'FundsAdded'
    value: [AccountId, BalanceOf]
}

/**
 *  The user has started the unbonding process
 */
export interface PocEvent_UnbondingStarted {
    __kind: 'UnbondingStarted'
    value: [AccountId, BalanceOf]
}

/**
 *  Voter,Candidate,VotingPower
 */
export interface PocEvent_Voted {
    __kind: 'Voted'
    value: [AccountId, AccountId, BalanceOf]
}

/**
 *  Voter,Reward
 */
export interface PocEvent_VoterRewarded {
    __kind: 'VoterRewarded'
    value: [EraIndex, AccountId, BalanceOf]
}

export type OffencesEvent = OffencesEvent_Offence

/**
 *  There is an offence reported of the given `kind` happened at the `session_index` and
 *  (kind-specific) time slot. This event is not deposited for duplicate slashes. last
 *  element indicates of the offence was applied (true) or queued (false)
 *  \[kind, timeslot, applied\].
 */
export interface OffencesEvent_Offence {
    __kind: 'Offence'
    value: [Kind, OpaqueTimeSlot, boolean]
}

export type OpaqueTimeSlot = Bytes

export type Kind = Bytes

export type IndicesEvent = IndicesEvent_IndexAssigned | IndicesEvent_IndexFreed | IndicesEvent_IndexFrozen

/**
 *  A account index was assigned. \[index, who\]
 */
export interface IndicesEvent_IndexAssigned {
    __kind: 'IndexAssigned'
    value: [AccountId, AccountIndex]
}

/**
 *  A account index has been freed up (unassigned). \[index\]
 */
export interface IndicesEvent_IndexFreed {
    __kind: 'IndexFreed'
    value: AccountIndex
}

/**
 *  A account index has been frozen to its current account ID. \[index, who\]
 */
export interface IndicesEvent_IndexFrozen {
    __kind: 'IndexFrozen'
    value: [AccountIndex, AccountId]
}

export type AccountIndex = number

export type ImOnlineEvent = ImOnlineEvent_AllGood | ImOnlineEvent_HeartbeatReceived | ImOnlineEvent_SomeOffline

/**
 *  At the end of the session, no offence was committed.
 */
export interface ImOnlineEvent_AllGood {
    __kind: 'AllGood'
}

/**
 *  A new heartbeat was received from `AuthorityId` \[authority_id\]
 */
export interface ImOnlineEvent_HeartbeatReceived {
    __kind: 'HeartbeatReceived'
    value: AuthorityId
}

/**
 *  At the end of the session, at least one validator was found to be \[offline\].
 */
export interface ImOnlineEvent_SomeOffline {
    __kind: 'SomeOffline'
    value: IdentificationTuple[]
}

export type IdentificationTuple = [ValidatorId, FullIdentification]

export interface FullIdentification {
    total: bigint
    own: bigint
    others: IndividualExposure[]
}

export type ValidatorId = Bytes

export type AuthorityId = Bytes

export type IdentityEvent = IdentityEvent_IdentityCleared | IdentityEvent_IdentityKilled | IdentityEvent_IdentitySet | IdentityEvent_JudgementGiven | IdentityEvent_JudgementRequested | IdentityEvent_JudgementUnrequested | IdentityEvent_RegistrarAdded | IdentityEvent_SubIdentityAdded | IdentityEvent_SubIdentityRemoved | IdentityEvent_SubIdentityRevoked

/**
 *  A name was cleared, and the given balance returned. \[who, deposit\]
 */
export interface IdentityEvent_IdentityCleared {
    __kind: 'IdentityCleared'
    value: [AccountId, Balance]
}

/**
 *  A name was removed and the given balance slashed. \[who, deposit\]
 */
export interface IdentityEvent_IdentityKilled {
    __kind: 'IdentityKilled'
    value: [AccountId, Balance]
}

/**
 *  A name was set or reset (which will remove all judgements). \[who\]
 */
export interface IdentityEvent_IdentitySet {
    __kind: 'IdentitySet'
    value: AccountId
}

/**
 *  A judgement was given by a registrar. \[target, registrar_index\]
 */
export interface IdentityEvent_JudgementGiven {
    __kind: 'JudgementGiven'
    value: [AccountId, RegistrarIndex]
}

/**
 *  A judgement was asked from a registrar. \[who, registrar_index\]
 */
export interface IdentityEvent_JudgementRequested {
    __kind: 'JudgementRequested'
    value: [AccountId, RegistrarIndex]
}

/**
 *  A judgement request was retracted. \[who, registrar_index\]
 */
export interface IdentityEvent_JudgementUnrequested {
    __kind: 'JudgementUnrequested'
    value: [AccountId, RegistrarIndex]
}

/**
 *  A registrar was added. \[registrar_index\]
 */
export interface IdentityEvent_RegistrarAdded {
    __kind: 'RegistrarAdded'
    value: RegistrarIndex
}

/**
 *  A sub-identity was added to an identity and the deposit paid. \[sub, main, deposit\]
 */
export interface IdentityEvent_SubIdentityAdded {
    __kind: 'SubIdentityAdded'
    value: [AccountId, AccountId, Balance]
}

/**
 *  A sub-identity was removed from an identity and the deposit freed.
 *  \[sub, main, deposit\]
 */
export interface IdentityEvent_SubIdentityRemoved {
    __kind: 'SubIdentityRemoved'
    value: [AccountId, AccountId, Balance]
}

/**
 *  A sub-identity was cleared, and the given deposit repatriated from the
 *  main identity account to the sub-identity account. \[sub, main, deposit\]
 */
export interface IdentityEvent_SubIdentityRevoked {
    __kind: 'SubIdentityRevoked'
    value: [AccountId, AccountId, Balance]
}

export type GrandpaEvent = GrandpaEvent_NewAuthorities | GrandpaEvent_Paused | GrandpaEvent_Resumed

/**
 *  New authority set has been applied. \[authority_set\]
 */
export interface GrandpaEvent_NewAuthorities {
    __kind: 'NewAuthorities'
    value: NextAuthority[]
}

/**
 *  Current authority set has been paused.
 */
export interface GrandpaEvent_Paused {
    __kind: 'Paused'
}

/**
 *  Current authority set has been resumed.
 */
export interface GrandpaEvent_Resumed {
    __kind: 'Resumed'
}

export type NextAuthority = [AuthorityId, AuthorityWeight]

export type AuthorityWeight = bigint

export type EvmAccountsEvent = EvmAccountsEvent_ClaimAccount

/**
 *  Mapping between Substrate accounts and EVM accounts
 *  claim account. \[account_id, evm_address\]
 */
export interface EvmAccountsEvent_ClaimAccount {
    __kind: 'ClaimAccount'
    value: [AccountId, EvmAddress]
}

export type EVMEvent = EVMEvent_AddStorageQuota | EVMEvent_BalanceDeposit | EVMEvent_BalanceWithdraw | EVMEvent_CanceledTransferMaintainer | EVMEvent_ConfirmedTransferMaintainer | EVMEvent_ContractDeployed | EVMEvent_ContractDevelopmentDisabled | EVMEvent_ContractDevelopmentEnabled | EVMEvent_ContractSelfdestructed | EVMEvent_ContractSetCode | EVMEvent_Created | EVMEvent_CreatedFailed | EVMEvent_Executed | EVMEvent_ExecutedFailed | EVMEvent_Log | EVMEvent_RejectedTransferMaintainer | EVMEvent_RemoveStorageQuota | EVMEvent_TransferredMaintainer

/**
 *  A quota has been added at a given address. \[address, bytes\]
 */
export interface EVMEvent_AddStorageQuota {
    __kind: 'AddStorageQuota'
    value: [EvmAddress, number]
}

/**
 *  A deposit has been made at a given address. \[sender, address,
 *  value\]
 */
export interface EVMEvent_BalanceDeposit {
    __kind: 'BalanceDeposit'
    value: [AccountId, EvmAddress, bigint]
}

/**
 *  A withdrawal has been made from a given address. \[sender, address,
 *  value\]
 */
export interface EVMEvent_BalanceWithdraw {
    __kind: 'BalanceWithdraw'
    value: [AccountId, EvmAddress, bigint]
}

/**
 *  Canceled the transfer maintainer. \[contract, address\]
 */
export interface EVMEvent_CanceledTransferMaintainer {
    __kind: 'CanceledTransferMaintainer'
    value: [EvmAddress, EvmAddress]
}

/**
 *  Confirmed the transfer maintainer. \[contract, address\]
 */
export interface EVMEvent_ConfirmedTransferMaintainer {
    __kind: 'ConfirmedTransferMaintainer'
    value: [EvmAddress, EvmAddress]
}

/**
 *  Deployed contract. \[contract\]
 */
export interface EVMEvent_ContractDeployed {
    __kind: 'ContractDeployed'
    value: EvmAddress
}

/**
 *  Disabled contract development. \[who\]
 */
export interface EVMEvent_ContractDevelopmentDisabled {
    __kind: 'ContractDevelopmentDisabled'
    value: AccountId
}

/**
 *  Enabled contract development. \[who\]
 */
export interface EVMEvent_ContractDevelopmentEnabled {
    __kind: 'ContractDevelopmentEnabled'
    value: AccountId
}

/**
 *  Selfdestructed contract code. \[contract\]
 */
export interface EVMEvent_ContractSelfdestructed {
    __kind: 'ContractSelfdestructed'
    value: EvmAddress
}

/**
 *  Set contract code. \[contract\]
 */
export interface EVMEvent_ContractSetCode {
    __kind: 'ContractSetCode'
    value: EvmAddress
}

/**
 *  A contract has been created at given \[address\].
 */
export interface EVMEvent_Created {
    __kind: 'Created'
    value: EvmAddress
}

/**
 *  A contract was attempted to be created, but the execution failed.
 *  \[contract, exit_reason, output\]
 */
export interface EVMEvent_CreatedFailed {
    __kind: 'CreatedFailed'
    value: [EvmAddress, ExitReason, Bytes]
}

/**
 *  A \[contract\] has been executed successfully with states applied.
 */
export interface EVMEvent_Executed {
    __kind: 'Executed'
    value: EvmAddress
}

/**
 *  A contract has been executed with errors. States are reverted with
 *  only gas fees applied. \[contract, exit_reason, output\]
 */
export interface EVMEvent_ExecutedFailed {
    __kind: 'ExecutedFailed'
    value: [EvmAddress, ExitReason, Bytes]
}

/**
 *  Ethereum events from contracts.
 */
export interface EVMEvent_Log {
    __kind: 'Log'
    value: EvmLog
}

/**
 *  Rejected the transfer maintainer. \[contract, address\]
 */
export interface EVMEvent_RejectedTransferMaintainer {
    __kind: 'RejectedTransferMaintainer'
    value: [EvmAddress, EvmAddress]
}

/**
 *  A quota has been removed at a given address. \[address, bytes\]
 */
export interface EVMEvent_RemoveStorageQuota {
    __kind: 'RemoveStorageQuota'
    value: [EvmAddress, number]
}

/**
 *  Transferred maintainer. \[contract, address\]
 */
export interface EVMEvent_TransferredMaintainer {
    __kind: 'TransferredMaintainer'
    value: [EvmAddress, EvmAddress]
}

export interface EvmLog {
    address: H160
    topics: H256[]
    data: Bytes
}

export type ExitReason = ExitReason_Error | ExitReason_Fatal | ExitReason_Revert | ExitReason_Succeed

export interface ExitReason_Error {
    __kind: 'Error'
    value: ExitError
}

export interface ExitReason_Fatal {
    __kind: 'Fatal'
    value: ExitFatal
}

export interface ExitReason_Revert {
    __kind: 'Revert'
    value: ExitRevert
}

export interface ExitReason_Succeed {
    __kind: 'Succeed'
    value: ExitSucceed
}

export type ExitSucceed = ExitSucceed_Returned | ExitSucceed_Stopped | ExitSucceed_Suicided

export interface ExitSucceed_Returned {
    __kind: 'Returned'
}

export interface ExitSucceed_Stopped {
    __kind: 'Stopped'
}

export interface ExitSucceed_Suicided {
    __kind: 'Suicided'
}

export type ExitRevert = ExitRevert_Reverted

export interface ExitRevert_Reverted {
    __kind: 'Reverted'
}

export type ExitFatal = ExitFatal_CallErrorAsFatal | ExitFatal_NotSupported | ExitFatal_Other | ExitFatal_UnhandledInterrupt

export interface ExitFatal_CallErrorAsFatal {
    __kind: 'CallErrorAsFatal'
    value: ExitError
}

export interface ExitFatal_NotSupported {
    __kind: 'NotSupported'
}

export interface ExitFatal_Other {
    __kind: 'Other'
    value: string
}

export interface ExitFatal_UnhandledInterrupt {
    __kind: 'UnhandledInterrupt'
}

export type ExitError = ExitError_CallTooDeep | ExitError_CreateCollision | ExitError_CreateContractLimit | ExitError_CreateEmpty | ExitError_DesignatedInvalid | ExitError_InvalidJump | ExitError_InvalidRange | ExitError_Other | ExitError_OutOfFund | ExitError_OutOfGas | ExitError_OutOfOffset | ExitError_PCUnderflow | ExitError_StackOverflow | ExitError_StackUnderflow

export interface ExitError_CallTooDeep {
    __kind: 'CallTooDeep'
}

export interface ExitError_CreateCollision {
    __kind: 'CreateCollision'
}

export interface ExitError_CreateContractLimit {
    __kind: 'CreateContractLimit'
}

export interface ExitError_CreateEmpty {
    __kind: 'CreateEmpty'
}

export interface ExitError_DesignatedInvalid {
    __kind: 'DesignatedInvalid'
}

export interface ExitError_InvalidJump {
    __kind: 'InvalidJump'
}

export interface ExitError_InvalidRange {
    __kind: 'InvalidRange'
}

export interface ExitError_Other {
    __kind: 'Other'
    value: string
}

export interface ExitError_OutOfFund {
    __kind: 'OutOfFund'
}

export interface ExitError_OutOfGas {
    __kind: 'OutOfGas'
}

export interface ExitError_OutOfOffset {
    __kind: 'OutOfOffset'
}

export interface ExitError_PCUnderflow {
    __kind: 'PCUnderflow'
}

export interface ExitError_StackOverflow {
    __kind: 'StackOverflow'
}

export interface ExitError_StackUnderflow {
    __kind: 'StackUnderflow'
}

export type CurrenciesEvent = CurrenciesEvent_BalanceUpdated | CurrenciesEvent_Deposited | CurrenciesEvent_Transferred | CurrenciesEvent_Withdrawn

/**
 *  Update balance success. [currency_id, who, amount]
 */
export interface CurrenciesEvent_BalanceUpdated {
    __kind: 'BalanceUpdated'
    value: [CurrencyIdOf, AccountId, AmountOf]
}

/**
 *  Deposit success. [currency_id, who, amount]
 */
export interface CurrenciesEvent_Deposited {
    __kind: 'Deposited'
    value: [CurrencyIdOf, AccountId, BalanceOf]
}

/**
 *  Currency transfer success. [currency_id, from, to, amount]
 */
export interface CurrenciesEvent_Transferred {
    __kind: 'Transferred'
    value: [CurrencyIdOf, AccountId, AccountId, BalanceOf]
}

/**
 *  Withdraw success. [currency_id, who, amount]
 */
export interface CurrenciesEvent_Withdrawn {
    __kind: 'Withdrawn'
    value: [CurrencyIdOf, AccountId, BalanceOf]
}

export type AmountOf = bigint

export type CurrencyIdOf = CurrencyIdOf_DEXShare | CurrencyIdOf_ERC20 | CurrencyIdOf_Token

export interface CurrencyIdOf_DEXShare {
    __kind: 'DEXShare'
    value: [TokenSymbol, TokenSymbol]
}

export interface CurrencyIdOf_ERC20 {
    __kind: 'ERC20'
    value: EvmAddress
}

export interface CurrencyIdOf_Token {
    __kind: 'Token'
    value: TokenSymbol
}

export type BalancesEvent = BalancesEvent_BalanceSet | BalancesEvent_Deposit | BalancesEvent_DustLost | BalancesEvent_Endowed | BalancesEvent_ReserveRepatriated | BalancesEvent_Reserved | BalancesEvent_Transfer | BalancesEvent_Unreserved

/**
 *  A balance was set by root. \[who, free, reserved\]
 */
export interface BalancesEvent_BalanceSet {
    __kind: 'BalanceSet'
    value: [AccountId, Balance, Balance]
}

/**
 *  Some amount was deposited (e.g. for transaction fees). \[who, deposit\]
 */
export interface BalancesEvent_Deposit {
    __kind: 'Deposit'
    value: [AccountId, Balance]
}

/**
 *  An account was removed whose balance was non-zero but below ExistentialDeposit,
 *  resulting in an outright loss. \[account, balance\]
 */
export interface BalancesEvent_DustLost {
    __kind: 'DustLost'
    value: [AccountId, Balance]
}

/**
 *  An account was created with some free balance. \[account, free_balance\]
 */
export interface BalancesEvent_Endowed {
    __kind: 'Endowed'
    value: [AccountId, Balance]
}

/**
 *  Some balance was moved from the reserve of the first account to the second account.
 *  Final argument indicates the destination balance type.
 *  \[from, to, balance, destination_status\]
 */
export interface BalancesEvent_ReserveRepatriated {
    __kind: 'ReserveRepatriated'
    value: [AccountId, AccountId, Balance, BalanceStatus]
}

/**
 *  Some balance was reserved (moved from free to reserved). \[who, value\]
 */
export interface BalancesEvent_Reserved {
    __kind: 'Reserved'
    value: [AccountId, Balance]
}

/**
 *  Transfer succeeded. \[from, to, value\]
 */
export interface BalancesEvent_Transfer {
    __kind: 'Transfer'
    value: [AccountId, AccountId, Balance]
}

/**
 *  Some balance was unreserved (moved from reserved to free). \[who, value\]
 */
export interface BalancesEvent_Unreserved {
    __kind: 'Unreserved'
    value: [AccountId, Balance]
}

export type BalanceStatus = BalanceStatus_Free | BalanceStatus_Reserved

export interface BalanceStatus_Free {
    __kind: 'Free'
}

export interface BalanceStatus_Reserved {
    __kind: 'Reserved'
}

export type AuthorityEvent = AuthorityEvent_Cancelled | AuthorityEvent_Delayed | AuthorityEvent_Dispatched | AuthorityEvent_FastTracked | AuthorityEvent_Scheduled

/**
 *  A scheduled call is cancelled. [origin, index]
 */
export interface AuthorityEvent_Cancelled {
    __kind: 'Cancelled'
    value: [PalletsOrigin, ScheduleTaskIndex]
}

/**
 *  A scheduled call is delayed. [origin, index, when]
 */
export interface AuthorityEvent_Delayed {
    __kind: 'Delayed'
    value: [PalletsOrigin, ScheduleTaskIndex, BlockNumber]
}

/**
 *  A call is dispatched. [result]
 */
export interface AuthorityEvent_Dispatched {
    __kind: 'Dispatched'
    value: DispatchResult
}

/**
 *  A scheduled call is fast tracked. [origin, index, when]
 */
export interface AuthorityEvent_FastTracked {
    __kind: 'FastTracked'
    value: [PalletsOrigin, ScheduleTaskIndex, BlockNumber]
}

/**
 *  A call is scheduled. [origin, index]
 */
export interface AuthorityEvent_Scheduled {
    __kind: 'Scheduled'
    value: [PalletsOrigin, ScheduleTaskIndex]
}

export type ScheduleTaskIndex = number

export type PalletsOrigin = PalletsOrigin_Accounts | PalletsOrigin_Authority | PalletsOrigin_Authorship | PalletsOrigin_Babe | PalletsOrigin_Balances | PalletsOrigin_Contracts | PalletsOrigin_Currencies | PalletsOrigin_EVM | PalletsOrigin_ElectionsPhragmen | PalletsOrigin_GraduallyUpdate | PalletsOrigin_Grandpa | PalletsOrigin_Historical | PalletsOrigin_Indices | PalletsOrigin_Multisig | PalletsOrigin_Proxy | PalletsOrigin_RandomnessCollectiveFlip | PalletsOrigin_Recovery | PalletsOrigin_Scheduler | PalletsOrigin_Session | PalletsOrigin_Staking | PalletsOrigin_Sudo | PalletsOrigin_System | PalletsOrigin_Timestamp | PalletsOrigin_Tokens | PalletsOrigin_TransactionPayment | PalletsOrigin_Utility | PalletsOrigin_Vesting

export interface PalletsOrigin_Accounts {
    __kind: 'Accounts'
}

export interface PalletsOrigin_Authority {
    __kind: 'Authority'
    value: DelayedOrigin
}

export interface PalletsOrigin_Authorship {
    __kind: 'Authorship'
}

export interface PalletsOrigin_Babe {
    __kind: 'Babe'
}

export interface PalletsOrigin_Balances {
    __kind: 'Balances'
}

export interface PalletsOrigin_Contracts {
    __kind: 'Contracts'
}

export interface PalletsOrigin_Currencies {
    __kind: 'Currencies'
}

export interface PalletsOrigin_EVM {
    __kind: 'EVM'
}

export interface PalletsOrigin_ElectionsPhragmen {
    __kind: 'ElectionsPhragmen'
}

export interface PalletsOrigin_GraduallyUpdate {
    __kind: 'GraduallyUpdate'
}

export interface PalletsOrigin_Grandpa {
    __kind: 'Grandpa'
}

export interface PalletsOrigin_Historical {
    __kind: 'Historical'
}

export interface PalletsOrigin_Indices {
    __kind: 'Indices'
}

export interface PalletsOrigin_Multisig {
    __kind: 'Multisig'
}

export interface PalletsOrigin_Proxy {
    __kind: 'Proxy'
}

export interface PalletsOrigin_RandomnessCollectiveFlip {
    __kind: 'RandomnessCollectiveFlip'
}

export interface PalletsOrigin_Recovery {
    __kind: 'Recovery'
}

export interface PalletsOrigin_Scheduler {
    __kind: 'Scheduler'
}

export interface PalletsOrigin_Session {
    __kind: 'Session'
}

export interface PalletsOrigin_Staking {
    __kind: 'Staking'
}

export interface PalletsOrigin_Sudo {
    __kind: 'Sudo'
}

export interface PalletsOrigin_System {
    __kind: 'System'
    value: SystemOrigin
}

export interface PalletsOrigin_Timestamp {
    __kind: 'Timestamp'
}

export interface PalletsOrigin_Tokens {
    __kind: 'Tokens'
}

export interface PalletsOrigin_TransactionPayment {
    __kind: 'TransactionPayment'
}

export interface PalletsOrigin_Utility {
    __kind: 'Utility'
}

export interface PalletsOrigin_Vesting {
    __kind: 'Vesting'
}

export type SystemOrigin = SystemOrigin_None | SystemOrigin_Root | SystemOrigin_Signed

export interface SystemOrigin_None {
    __kind: 'None'
}

export interface SystemOrigin_Root {
    __kind: 'Root'
}

export interface SystemOrigin_Signed {
    __kind: 'Signed'
    value: AccountId
}

export interface DelayedOrigin {
    delay: BlockNumber
    origin: PalletsOrigin
}

export const EventRecord: sts.Type<EventRecord> = sts.struct(() => {
    return  {
        phase: Phase,
        event: Type_327,
        topics: sts.array(() => Hash),
    }
})

export const Type_327: sts.Type<Type_327> = sts.closedEnum(() => {
    return  {
        Authority: AuthorityEvent,
        Balances: BalancesEvent,
        Currencies: CurrenciesEvent,
        EVM: EVMEvent,
        EvmAccounts: EvmAccountsEvent,
        Grandpa: GrandpaEvent,
        Identity: IdentityEvent,
        ImOnline: ImOnlineEvent,
        Indices: IndicesEvent,
        Offences: OffencesEvent,
        Poc: PocEvent,
        Scheduler: SchedulerEvent,
        Session: SessionEvent,
        Staking: StakingEvent,
        Sudo: SudoEvent,
        System: SystemEvent,
        TechCouncil: TechCouncilEvent,
        Tokens: TokensEvent,
    }
})

export const TokensEvent: sts.Type<TokensEvent> = sts.closedEnum(() => {
    return  {
        DustLost: sts.tuple(() => [AccountId, CurrencyId, Balance]),
        Transferred: sts.tuple(() => [CurrencyId, AccountId, AccountId, Balance]),
    }
})

export const CurrencyId: sts.Type<CurrencyId> = sts.closedEnum(() => {
    return  {
        DEXShare: sts.tuple(() => [TokenSymbol, TokenSymbol]),
        ERC20: EvmAddress,
        Token: TokenSymbol,
    }
})

export const TokenSymbol: sts.Type<TokenSymbol> = sts.closedEnum(() => {
    return  {
        REEF: sts.unit(),
        RUSD: sts.unit(),
    }
})

export const TechCouncilEvent: sts.Type<TechCouncilEvent> = sts.closedEnum(() => {
    return  {
        Approved: Hash,
        Closed: sts.tuple(() => [Hash, MemberCount, MemberCount]),
        Disapproved: Hash,
        Executed: sts.tuple(() => [Hash, DispatchResult]),
        MemberExecuted: sts.tuple(() => [Hash, DispatchResult]),
        Proposed: sts.tuple(() => [AccountId, ProposalIndex, Hash, MemberCount]),
        Voted: sts.tuple(() => [AccountId, Hash, sts.boolean(), MemberCount, MemberCount]),
    }
})

export const ProposalIndex = sts.number()

export const DispatchResult = sts.result(() => sts.unit(), () => DispatchError)

export const DispatchError: sts.Type<DispatchError> = sts.closedEnum(() => {
    return  {
        Arithmetic: ArithmeticError,
        BadOrigin: sts.unit(),
        CannotLookup: sts.unit(),
        ConsumerRemaining: sts.unit(),
        Module: DispatchErrorModule,
        NoProviders: sts.unit(),
        Other: sts.unit(),
        Token: TokenError,
    }
})

export const TokenError: sts.Type<TokenError> = sts.closedEnum(() => {
    return  {
        BelowMinimum: sts.unit(),
        CannotCreate: sts.unit(),
        Frozen: sts.unit(),
        NoFunds: sts.unit(),
        Overflow: sts.unit(),
        Underflow: sts.unit(),
        UnknownAsset: sts.unit(),
        WouldDie: sts.unit(),
    }
})

export const DispatchErrorModule: sts.Type<DispatchErrorModule> = sts.struct(() => {
    return  {
        index: sts.number(),
        error: sts.number(),
    }
})

export const ArithmeticError: sts.Type<ArithmeticError> = sts.closedEnum(() => {
    return  {
        DivisionByZero: sts.unit(),
        Overflow: sts.unit(),
        Underflow: sts.unit(),
    }
})

export const MemberCount = sts.number()

export const SystemEvent: sts.Type<SystemEvent> = sts.closedEnum(() => {
    return  {
        CodeUpdated: sts.unit(),
        ExtrinsicFailed: sts.tuple(() => [DispatchError, DispatchInfo]),
        ExtrinsicSuccess: DispatchInfo,
        KilledAccount: AccountId,
        NewAccount: AccountId,
    }
})

export const DispatchInfo: sts.Type<DispatchInfo> = sts.struct(() => {
    return  {
        weight: Weight,
        class: DispatchClass,
        paysFee: Pays,
    }
})

export const Pays: sts.Type<Pays> = sts.closedEnum(() => {
    return  {
        No: sts.unit(),
        Yes: sts.unit(),
    }
})

export const DispatchClass: sts.Type<DispatchClass> = sts.closedEnum(() => {
    return  {
        Mandatory: sts.unit(),
        Normal: sts.unit(),
        Operational: sts.unit(),
    }
})

export const Weight = sts.bigint()

export const SudoEvent: sts.Type<SudoEvent> = sts.closedEnum(() => {
    return  {
        KeyChanged: AccountId,
        Sudid: DispatchResult,
        SudoAsDone: DispatchResult,
    }
})

export const StakingEvent: sts.Type<StakingEvent> = sts.closedEnum(() => {
    return  {
        Bonded: sts.tuple(() => [AccountId, Balance]),
        EraPayout: sts.tuple(() => [EraIndex, Balance, Balance]),
        Kicked: sts.tuple(() => [AccountId, AccountId]),
        OldSlashingReportDiscarded: SessionIndex,
        Reward: sts.tuple(() => [AccountId, Balance]),
        Slash: sts.tuple(() => [AccountId, Balance]),
        SolutionStored: ElectionCompute,
        StakingElection: ElectionCompute,
        Unbonded: sts.tuple(() => [AccountId, Balance]),
        Withdrawn: sts.tuple(() => [AccountId, Balance]),
    }
})

export const SessionEvent: sts.Type<SessionEvent> = sts.closedEnum(() => {
    return  {
        NewSession: SessionIndex,
    }
})

export const SchedulerEvent: sts.Type<SchedulerEvent> = sts.closedEnum(() => {
    return  {
        Canceled: sts.tuple(() => [BlockNumber, sts.number()]),
        Dispatched: sts.tuple(() => [TaskAddress, sts.option(() => sts.bytes()), DispatchResult]),
        Scheduled: sts.tuple(() => [BlockNumber, sts.number()]),
    }
})

export const TaskAddress = sts.tuple(() => [BlockNumber, sts.number()])

export const PocEvent: sts.Type<PocEvent> = sts.closedEnum(() => {
    return  {
        BondWithdrawn: sts.tuple(() => [AccountId, BalanceOf]),
        CandidateAdded: AccountId,
        CandidateRemoved: AccountId,
        Committed: sts.tuple(() => [AccountId, BalanceOf]),
        Elected: sts.tuple(() => [EraIndex, AccountId, BalanceOf]),
        FundsAdded: sts.tuple(() => [AccountId, BalanceOf]),
        UnbondingStarted: sts.tuple(() => [AccountId, BalanceOf]),
        Voted: sts.tuple(() => [AccountId, AccountId, BalanceOf]),
        VoterRewarded: sts.tuple(() => [EraIndex, AccountId, BalanceOf]),
    }
})

export const OffencesEvent: sts.Type<OffencesEvent> = sts.closedEnum(() => {
    return  {
        Offence: sts.tuple(() => [Kind, OpaqueTimeSlot, sts.boolean()]),
    }
})

export const OpaqueTimeSlot = sts.bytes()

export const Kind = sts.bytes()

export const IndicesEvent: sts.Type<IndicesEvent> = sts.closedEnum(() => {
    return  {
        IndexAssigned: sts.tuple(() => [AccountId, AccountIndex]),
        IndexFreed: AccountIndex,
        IndexFrozen: sts.tuple(() => [AccountIndex, AccountId]),
    }
})

export const AccountIndex = sts.number()

export const ImOnlineEvent: sts.Type<ImOnlineEvent> = sts.closedEnum(() => {
    return  {
        AllGood: sts.unit(),
        HeartbeatReceived: AuthorityId,
        SomeOffline: sts.array(() => IdentificationTuple),
    }
})

export const IdentificationTuple = sts.tuple(() => [ValidatorId, FullIdentification])

export const FullIdentification: sts.Type<FullIdentification> = sts.struct(() => {
    return  {
        total: sts.bigint(),
        own: sts.bigint(),
        others: sts.array(() => IndividualExposure),
    }
})

export const ValidatorId = sts.bytes()

export const AuthorityId = sts.bytes()

export const IdentityEvent: sts.Type<IdentityEvent> = sts.closedEnum(() => {
    return  {
        IdentityCleared: sts.tuple(() => [AccountId, Balance]),
        IdentityKilled: sts.tuple(() => [AccountId, Balance]),
        IdentitySet: AccountId,
        JudgementGiven: sts.tuple(() => [AccountId, RegistrarIndex]),
        JudgementRequested: sts.tuple(() => [AccountId, RegistrarIndex]),
        JudgementUnrequested: sts.tuple(() => [AccountId, RegistrarIndex]),
        RegistrarAdded: RegistrarIndex,
        SubIdentityAdded: sts.tuple(() => [AccountId, AccountId, Balance]),
        SubIdentityRemoved: sts.tuple(() => [AccountId, AccountId, Balance]),
        SubIdentityRevoked: sts.tuple(() => [AccountId, AccountId, Balance]),
    }
})

export const GrandpaEvent: sts.Type<GrandpaEvent> = sts.closedEnum(() => {
    return  {
        NewAuthorities: sts.array(() => NextAuthority),
        Paused: sts.unit(),
        Resumed: sts.unit(),
    }
})

export const NextAuthority = sts.tuple(() => [AuthorityId, AuthorityWeight])

export const AuthorityWeight = sts.bigint()

export const EvmAccountsEvent: sts.Type<EvmAccountsEvent> = sts.closedEnum(() => {
    return  {
        ClaimAccount: sts.tuple(() => [AccountId, EvmAddress]),
    }
})

export const EVMEvent: sts.Type<EVMEvent> = sts.closedEnum(() => {
    return  {
        AddStorageQuota: sts.tuple(() => [EvmAddress, sts.number()]),
        BalanceDeposit: sts.tuple(() => [AccountId, EvmAddress, sts.bigint()]),
        BalanceWithdraw: sts.tuple(() => [AccountId, EvmAddress, sts.bigint()]),
        CanceledTransferMaintainer: sts.tuple(() => [EvmAddress, EvmAddress]),
        ConfirmedTransferMaintainer: sts.tuple(() => [EvmAddress, EvmAddress]),
        ContractDeployed: EvmAddress,
        ContractDevelopmentDisabled: AccountId,
        ContractDevelopmentEnabled: AccountId,
        ContractSelfdestructed: EvmAddress,
        ContractSetCode: EvmAddress,
        Created: EvmAddress,
        CreatedFailed: sts.tuple(() => [EvmAddress, ExitReason, sts.bytes()]),
        Executed: EvmAddress,
        ExecutedFailed: sts.tuple(() => [EvmAddress, ExitReason, sts.bytes()]),
        Log: EvmLog,
        RejectedTransferMaintainer: sts.tuple(() => [EvmAddress, EvmAddress]),
        RemoveStorageQuota: sts.tuple(() => [EvmAddress, sts.number()]),
        TransferredMaintainer: sts.tuple(() => [EvmAddress, EvmAddress]),
    }
})

export const EvmLog: sts.Type<EvmLog> = sts.struct(() => {
    return  {
        address: H160,
        topics: sts.array(() => H256),
        data: sts.bytes(),
    }
})

export const ExitReason: sts.Type<ExitReason> = sts.closedEnum(() => {
    return  {
        Error: ExitError,
        Fatal: ExitFatal,
        Revert: ExitRevert,
        Succeed: ExitSucceed,
    }
})

export const ExitSucceed: sts.Type<ExitSucceed> = sts.closedEnum(() => {
    return  {
        Returned: sts.unit(),
        Stopped: sts.unit(),
        Suicided: sts.unit(),
    }
})

export const ExitRevert: sts.Type<ExitRevert> = sts.closedEnum(() => {
    return  {
        Reverted: sts.unit(),
    }
})

export const ExitFatal: sts.Type<ExitFatal> = sts.closedEnum(() => {
    return  {
        CallErrorAsFatal: ExitError,
        NotSupported: sts.unit(),
        Other: sts.string(),
        UnhandledInterrupt: sts.unit(),
    }
})

export const ExitError: sts.Type<ExitError> = sts.closedEnum(() => {
    return  {
        CallTooDeep: sts.unit(),
        CreateCollision: sts.unit(),
        CreateContractLimit: sts.unit(),
        CreateEmpty: sts.unit(),
        DesignatedInvalid: sts.unit(),
        InvalidJump: sts.unit(),
        InvalidRange: sts.unit(),
        Other: sts.string(),
        OutOfFund: sts.unit(),
        OutOfGas: sts.unit(),
        OutOfOffset: sts.unit(),
        PCUnderflow: sts.unit(),
        StackOverflow: sts.unit(),
        StackUnderflow: sts.unit(),
    }
})

export const CurrenciesEvent: sts.Type<CurrenciesEvent> = sts.closedEnum(() => {
    return  {
        BalanceUpdated: sts.tuple(() => [CurrencyIdOf, AccountId, AmountOf]),
        Deposited: sts.tuple(() => [CurrencyIdOf, AccountId, BalanceOf]),
        Transferred: sts.tuple(() => [CurrencyIdOf, AccountId, AccountId, BalanceOf]),
        Withdrawn: sts.tuple(() => [CurrencyIdOf, AccountId, BalanceOf]),
    }
})

export const AmountOf = sts.bigint()

export const CurrencyIdOf: sts.Type<CurrencyIdOf> = sts.closedEnum(() => {
    return  {
        DEXShare: sts.tuple(() => [TokenSymbol, TokenSymbol]),
        ERC20: EvmAddress,
        Token: TokenSymbol,
    }
})

export const BalancesEvent: sts.Type<BalancesEvent> = sts.closedEnum(() => {
    return  {
        BalanceSet: sts.tuple(() => [AccountId, Balance, Balance]),
        Deposit: sts.tuple(() => [AccountId, Balance]),
        DustLost: sts.tuple(() => [AccountId, Balance]),
        Endowed: sts.tuple(() => [AccountId, Balance]),
        ReserveRepatriated: sts.tuple(() => [AccountId, AccountId, Balance, BalanceStatus]),
        Reserved: sts.tuple(() => [AccountId, Balance]),
        Transfer: sts.tuple(() => [AccountId, AccountId, Balance]),
        Unreserved: sts.tuple(() => [AccountId, Balance]),
    }
})

export const BalanceStatus: sts.Type<BalanceStatus> = sts.closedEnum(() => {
    return  {
        Free: sts.unit(),
        Reserved: sts.unit(),
    }
})

export const AuthorityEvent: sts.Type<AuthorityEvent> = sts.closedEnum(() => {
    return  {
        Cancelled: sts.tuple(() => [PalletsOrigin, ScheduleTaskIndex]),
        Delayed: sts.tuple(() => [PalletsOrigin, ScheduleTaskIndex, BlockNumber]),
        Dispatched: DispatchResult,
        FastTracked: sts.tuple(() => [PalletsOrigin, ScheduleTaskIndex, BlockNumber]),
        Scheduled: sts.tuple(() => [PalletsOrigin, ScheduleTaskIndex]),
    }
})

export const ScheduleTaskIndex = sts.number()

export const PalletsOrigin: sts.Type<PalletsOrigin> = sts.closedEnum(() => {
    return  {
        Accounts: sts.unit(),
        Authority: DelayedOrigin,
        Authorship: sts.unit(),
        Babe: sts.unit(),
        Balances: sts.unit(),
        Contracts: sts.unit(),
        Currencies: sts.unit(),
        EVM: sts.unit(),
        ElectionsPhragmen: sts.unit(),
        GraduallyUpdate: sts.unit(),
        Grandpa: sts.unit(),
        Historical: sts.unit(),
        Indices: sts.unit(),
        Multisig: sts.unit(),
        Proxy: sts.unit(),
        RandomnessCollectiveFlip: sts.unit(),
        Recovery: sts.unit(),
        Scheduler: sts.unit(),
        Session: sts.unit(),
        Staking: sts.unit(),
        Sudo: sts.unit(),
        System: SystemOrigin,
        Timestamp: sts.unit(),
        Tokens: sts.unit(),
        TransactionPayment: sts.unit(),
        Utility: sts.unit(),
        Vesting: sts.unit(),
    }
})

export const SystemOrigin: sts.Type<SystemOrigin> = sts.closedEnum(() => {
    return  {
        None: sts.unit(),
        Root: sts.unit(),
        Signed: AccountId,
    }
})

export const DelayedOrigin: sts.Type<DelayedOrigin> = sts.struct(() => {
    return  {
        delay: BlockNumber,
        origin: PalletsOrigin,
    }
})

export interface DigestOf {
    logs: DigestItem[]
}

export type DigestItem = DigestItem_AuthoritiesChange | DigestItem_ChangesTrieRoot | DigestItem_ChangesTrieSignal | DigestItem_Consensus | DigestItem_Other | DigestItem_PreRuntime | DigestItem_RuntimeEnvironmentUpdated | DigestItem_Seal | DigestItem_SealV0

export interface DigestItem_AuthoritiesChange {
    __kind: 'AuthoritiesChange'
    value: AuthorityId[]
}

export interface DigestItem_ChangesTrieRoot {
    __kind: 'ChangesTrieRoot'
    value: Hash
}

export interface DigestItem_ChangesTrieSignal {
    __kind: 'ChangesTrieSignal'
    value: ChangesTrieSignal
}

export interface DigestItem_Consensus {
    __kind: 'Consensus'
    value: Consensus
}

export interface DigestItem_Other {
    __kind: 'Other'
    value: Bytes
}

export interface DigestItem_PreRuntime {
    __kind: 'PreRuntime'
    value: PreRuntime
}

export interface DigestItem_RuntimeEnvironmentUpdated {
    __kind: 'RuntimeEnvironmentUpdated'
}

export interface DigestItem_Seal {
    __kind: 'Seal'
    value: Seal
}

export interface DigestItem_SealV0 {
    __kind: 'SealV0'
    value: SealV0
}

export type SealV0 = [bigint, Signature]

export type Signature = Bytes

export type Seal = [ConsensusEngineId, Bytes]

export type PreRuntime = [ConsensusEngineId, Bytes]

export type Consensus = [ConsensusEngineId, Bytes]

export type ConsensusEngineId = Bytes

export type ChangesTrieSignal = ChangesTrieSignal_NewConfiguration

export interface ChangesTrieSignal_NewConfiguration {
    __kind: 'NewConfiguration'
    value?: (ChangesTrieConfiguration | undefined)
}

export interface ChangesTrieConfiguration {
    digestInterval: number
    digestLevels: number
}

export const DigestOf: sts.Type<DigestOf> = sts.struct(() => {
    return  {
        logs: sts.array(() => DigestItem),
    }
})

export const DigestItem: sts.Type<DigestItem> = sts.closedEnum(() => {
    return  {
        AuthoritiesChange: sts.array(() => AuthorityId),
        ChangesTrieRoot: Hash,
        ChangesTrieSignal: ChangesTrieSignal,
        Consensus: Consensus,
        Other: sts.bytes(),
        PreRuntime: PreRuntime,
        RuntimeEnvironmentUpdated: sts.unit(),
        Seal: Seal,
        SealV0: SealV0,
    }
})

export const SealV0 = sts.tuple(() => [sts.bigint(), Signature])

export const Signature = sts.bytes()

export const Seal = sts.tuple(() => [ConsensusEngineId, sts.bytes()])

export const PreRuntime = sts.tuple(() => [ConsensusEngineId, sts.bytes()])

export const Consensus = sts.tuple(() => [ConsensusEngineId, sts.bytes()])

export const ConsensusEngineId = sts.bytes()

export const ChangesTrieSignal: sts.Type<ChangesTrieSignal> = sts.closedEnum(() => {
    return  {
        NewConfiguration: sts.option(() => ChangesTrieConfiguration),
    }
})

export const ChangesTrieConfiguration: sts.Type<ChangesTrieConfiguration> = sts.struct(() => {
    return  {
        digestInterval: sts.number(),
        digestLevels: sts.number(),
    }
})

export type BlockNumber = number

export type Hash = Bytes

export const Hash = sts.bytes()

export const BlockNumber = sts.number()

export interface ConsumedWeight {
    normal: Weight
    operational: Weight
    mandatory: Weight
}

export const ConsumedWeight: sts.Type<ConsumedWeight> = sts.struct(() => {
    return  {
        normal: Weight,
        operational: Weight,
        mandatory: Weight,
    }
})

export type AccountId = Bytes

export interface AccountInfo {
    nonce: Index
    consumers: RefCount
    providers: RefCount
    data: AccountData
}

export type RefCount = number

export const AccountInfo: sts.Type<AccountInfo> = sts.struct(() => {
    return  {
        nonce: Index,
        consumers: RefCount,
        providers: RefCount,
        data: AccountData,
    }
})

export const RefCount = sts.number()

export const AccountId = sts.bytes()
