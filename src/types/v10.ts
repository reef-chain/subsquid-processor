import {sts, Result, Option, Bytes, BitSequence} from './support'

export type Type_276 = Type_276_Authority | Type_276_Balances | Type_276_Currencies | Type_276_EVM | Type_276_EvmAccounts | Type_276_Grandpa | Type_276_Identity | Type_276_ImOnline | Type_276_Indices | Type_276_Multisig | Type_276_Offences | Type_276_Poc | Type_276_Scheduler | Type_276_Session | Type_276_Staking | Type_276_Sudo | Type_276_System | Type_276_TechCouncil | Type_276_Tokens | Type_276_Utility

export interface Type_276_Authority {
    __kind: 'Authority'
    value: AuthorityEvent
}

export interface Type_276_Balances {
    __kind: 'Balances'
    value: BalancesEvent
}

export interface Type_276_Currencies {
    __kind: 'Currencies'
    value: CurrenciesEvent
}

export interface Type_276_EVM {
    __kind: 'EVM'
    value: EVMEvent
}

export interface Type_276_EvmAccounts {
    __kind: 'EvmAccounts'
    value: EvmAccountsEvent
}

export interface Type_276_Grandpa {
    __kind: 'Grandpa'
    value: GrandpaEvent
}

export interface Type_276_Identity {
    __kind: 'Identity'
    value: IdentityEvent
}

export interface Type_276_ImOnline {
    __kind: 'ImOnline'
    value: ImOnlineEvent
}

export interface Type_276_Indices {
    __kind: 'Indices'
    value: IndicesEvent
}

export interface Type_276_Multisig {
    __kind: 'Multisig'
    value: MultisigEvent
}

export interface Type_276_Offences {
    __kind: 'Offences'
    value: OffencesEvent
}

export interface Type_276_Poc {
    __kind: 'Poc'
    value: PocEvent
}

export interface Type_276_Scheduler {
    __kind: 'Scheduler'
    value: SchedulerEvent
}

export interface Type_276_Session {
    __kind: 'Session'
    value: SessionEvent
}

export interface Type_276_Staking {
    __kind: 'Staking'
    value: StakingEvent
}

export interface Type_276_Sudo {
    __kind: 'Sudo'
    value: SudoEvent
}

export interface Type_276_System {
    __kind: 'System'
    value: SystemEvent
}

export interface Type_276_TechCouncil {
    __kind: 'TechCouncil'
    value: TechCouncilEvent
}

export interface Type_276_Tokens {
    __kind: 'Tokens'
    value: TokensEvent
}

export interface Type_276_Utility {
    __kind: 'Utility'
    value: UtilityEvent
}

export type UtilityEvent = UtilityEvent_BatchCompleted | UtilityEvent_BatchInterrupted | UtilityEvent_ItemCompleted

/**
 *  Batch of dispatches completed fully with no error.
 */
export interface UtilityEvent_BatchCompleted {
    __kind: 'BatchCompleted'
}

/**
 *  Batch of dispatches did not complete fully. Index of first failing dispatch given, as
 *  well as the error. \[index, error\]
 */
export interface UtilityEvent_BatchInterrupted {
    __kind: 'BatchInterrupted'
    value: [number, DispatchError]
}

/**
 *  A single item within a Batch of dispatches has completed with no error.
 */
export interface UtilityEvent_ItemCompleted {
    __kind: 'ItemCompleted'
}

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

export type TokensEvent = TokensEvent_BalanceSet | TokensEvent_DustLost | TokensEvent_Endowed | TokensEvent_Reserved | TokensEvent_Transfer | TokensEvent_Unreserved

/**
 *  A balance was set by root. \[who, free, reserved\]
 */
export interface TokensEvent_BalanceSet {
    __kind: 'BalanceSet'
    value: [CurrencyId, AccountId, Balance, Balance]
}

/**
 *  An account was removed whose balance was non-zero but below
 *  ExistentialDeposit, resulting in an outright loss. \[currency_id,
 *  account, balance\]
 */
export interface TokensEvent_DustLost {
    __kind: 'DustLost'
    value: [CurrencyId, AccountId, Balance]
}

/**
 *  An account was created with some free balance. \[currency_id,
 *  account, free_balance\]
 */
export interface TokensEvent_Endowed {
    __kind: 'Endowed'
    value: [CurrencyId, AccountId, Balance]
}

/**
 *  Some balance was reserved (moved from free to reserved).
 *  \[currency_id, who, value\]
 */
export interface TokensEvent_Reserved {
    __kind: 'Reserved'
    value: [CurrencyId, AccountId, Balance]
}

/**
 *  Transfer succeeded. \[currency_id, from, to, value\]
 */
export interface TokensEvent_Transfer {
    __kind: 'Transfer'
    value: [CurrencyId, AccountId, AccountId, Balance]
}

/**
 *  Some balance was unreserved (moved from reserved to free).
 *  \[currency_id, who, value\]
 */
export interface TokensEvent_Unreserved {
    __kind: 'Unreserved'
    value: [CurrencyId, AccountId, Balance]
}

export type Balance = bigint

export type AccountId = Bytes

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

export type EvmAddress = Bytes

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

export type MemberCount = number

export type Hash = Bytes

export type SystemEvent = SystemEvent_CodeUpdated | SystemEvent_ExtrinsicFailed | SystemEvent_ExtrinsicSuccess | SystemEvent_KilledAccount | SystemEvent_NewAccount | SystemEvent_Remarked

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

/**
 *  On on-chain remark happened. \[origin, remark_hash\]
 */
export interface SystemEvent_Remarked {
    __kind: 'Remarked'
    value: [AccountId, Hash]
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

export type StakingEvent = StakingEvent_Bonded | StakingEvent_Chilled | StakingEvent_EraPaid | StakingEvent_Kicked | StakingEvent_OldSlashingReportDiscarded | StakingEvent_PayoutStarted | StakingEvent_Rewarded | StakingEvent_Slashed | StakingEvent_StakersElected | StakingEvent_StakingElectionFailed | StakingEvent_Unbonded | StakingEvent_Withdrawn

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
 *  An account has stopped participating as either a validator or nominator.
 *  \[stash\]
 */
export interface StakingEvent_Chilled {
    __kind: 'Chilled'
    value: AccountId
}

/**
 *  The era payout has been set; the first balance is the validator-payout; the second is
 *  the remainder from the maximum amount of reward.
 *  \[era_index, validator_payout, remainder\]
 */
export interface StakingEvent_EraPaid {
    __kind: 'EraPaid'
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
 *  The stakers' rewards are getting paid. \[era_index, validator_stash\]
 */
export interface StakingEvent_PayoutStarted {
    __kind: 'PayoutStarted'
    value: [EraIndex, AccountId]
}

/**
 *  The nominator has been rewarded by this amount. \[stash, amount\]
 */
export interface StakingEvent_Rewarded {
    __kind: 'Rewarded'
    value: [AccountId, Balance]
}

/**
 *  One validator (and its nominators) has been slashed by the given amount.
 *  \[validator, amount\]
 */
export interface StakingEvent_Slashed {
    __kind: 'Slashed'
    value: [AccountId, Balance]
}

/**
 *  A new set of stakers was elected.
 */
export interface StakingEvent_StakersElected {
    __kind: 'StakersElected'
}

/**
 *  The election failed. No new era is planned.
 */
export interface StakingEvent_StakingElectionFailed {
    __kind: 'StakingElectionFailed'
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

export type SessionIndex = number

export type EraIndex = number

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

export type BlockNumber = number

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

export type BalanceOf = bigint

export type OffencesEvent = OffencesEvent_Offence

/**
 *  There is an offence reported of the given `kind` happened at the `session_index` and
 *  (kind-specific) time slot. This event is not deposited for duplicate slashes.
 *  \[kind, timeslot\].
 */
export interface OffencesEvent_Offence {
    __kind: 'Offence'
    value: [Kind, OpaqueTimeSlot]
}

export type OpaqueTimeSlot = Bytes

export type Kind = Bytes

export type MultisigEvent = MultisigEvent_MultisigApproval | MultisigEvent_MultisigCancelled | MultisigEvent_MultisigExecuted | MultisigEvent_NewMultisig

/**
 *  A multisig operation has been approved by someone.
 *  \[approving, timepoint, multisig, call_hash\]
 */
export interface MultisigEvent_MultisigApproval {
    __kind: 'MultisigApproval'
    value: [AccountId, Timepoint, AccountId, CallHash]
}

/**
 *  A multisig operation has been cancelled. \[cancelling, timepoint, multisig, call_hash\]
 */
export interface MultisigEvent_MultisigCancelled {
    __kind: 'MultisigCancelled'
    value: [AccountId, Timepoint, AccountId, CallHash]
}

/**
 *  A multisig operation has been executed. \[approving, timepoint, multisig, call_hash\]
 */
export interface MultisigEvent_MultisigExecuted {
    __kind: 'MultisigExecuted'
    value: [AccountId, Timepoint, AccountId, CallHash, DispatchResult]
}

/**
 *  A new multisig operation has begun. \[approving, multisig, call_hash\]
 */
export interface MultisigEvent_NewMultisig {
    __kind: 'NewMultisig'
    value: [AccountId, AccountId, CallHash]
}

export type CallHash = Bytes

export interface Timepoint {
    height: BlockNumber
    index: number
}

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

export interface IndividualExposure {
    who: AccountId
    value: bigint
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

export type RegistrarIndex = number

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
 *  Selfdestructed contract code. \[caller, contract\]
 */
export interface EVMEvent_ContractSelfdestructed {
    __kind: 'ContractSelfdestructed'
    value: [EvmAddress, EvmAddress]
}

/**
 *  Set contract code. \[contract\]
 */
export interface EVMEvent_ContractSetCode {
    __kind: 'ContractSetCode'
    value: EvmAddress
}

/**
 *  A new contract has been created. \[maintainer, contract, (gas_used, storage_used)\].
 */
export interface EVMEvent_Created {
    __kind: 'Created'
    value: [EvmAddress, EvmAddress, [bigint, number]]
}

/**
 *  A contract was attempted to be created, but the execution failed.
 *  \[maintainer, contract, exit_reason, output, (gas_used, storage_used)\]
 */
export interface EVMEvent_CreatedFailed {
    __kind: 'CreatedFailed'
    value: [EvmAddress, EvmAddress, ExitReason, Bytes, [bigint, number]]
}

/**
 *  A \[caller, contract, (gas_used, storage_used)\] has been executed successfully with states applied.
 */
export interface EVMEvent_Executed {
    __kind: 'Executed'
    value: [EvmAddress, EvmAddress, [bigint, number]]
}

/**
 *  A contract has been executed with errors. States are reverted with
 *  only gas fees applied. \[caller, contract, exit_reason, output, (gas_used, storage_used)\]
 */
export interface EVMEvent_ExecutedFailed {
    __kind: 'ExecutedFailed'
    value: [EvmAddress, EvmAddress, ExitReason, Bytes, [bigint, number]]
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

export type H256 = Bytes

export type H160 = Bytes

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

export type AuthorityEvent = AuthorityEvent_AuthorizedCall | AuthorityEvent_Cancelled | AuthorityEvent_Delayed | AuthorityEvent_Dispatched | AuthorityEvent_FastTracked | AuthorityEvent_RemovedAuthorizedCall | AuthorityEvent_Scheduled | AuthorityEvent_TriggeredCallBy

/**
 *  A call is authorized. \[hash, caller\]
 */
export interface AuthorityEvent_AuthorizedCall {
    __kind: 'AuthorizedCall'
    value: [Hash, (AccountId | undefined)]
}

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
 *  An authorized call was removed. \[hash\]
 */
export interface AuthorityEvent_RemovedAuthorizedCall {
    __kind: 'RemovedAuthorizedCall'
    value: Hash
}

/**
 *  A call is scheduled. [origin, index]
 */
export interface AuthorityEvent_Scheduled {
    __kind: 'Scheduled'
    value: [PalletsOrigin, ScheduleTaskIndex]
}

/**
 *  An authorized call was triggered. \[hash, caller\]
 */
export interface AuthorityEvent_TriggeredCallBy {
    __kind: 'TriggeredCallBy'
    value: [Hash, AccountId]
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

export const Type_276: sts.Type<Type_276> = sts.closedEnum(() => {
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
        Multisig: MultisigEvent,
        Offences: OffencesEvent,
        Poc: PocEvent,
        Scheduler: SchedulerEvent,
        Session: SessionEvent,
        Staking: StakingEvent,
        Sudo: SudoEvent,
        System: SystemEvent,
        TechCouncil: TechCouncilEvent,
        Tokens: TokensEvent,
        Utility: UtilityEvent,
    }
})

export const UtilityEvent: sts.Type<UtilityEvent> = sts.closedEnum(() => {
    return  {
        BatchCompleted: sts.unit(),
        BatchInterrupted: sts.tuple(() => [sts.number(), DispatchError]),
        ItemCompleted: sts.unit(),
    }
})

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

export const TokensEvent: sts.Type<TokensEvent> = sts.closedEnum(() => {
    return  {
        BalanceSet: sts.tuple(() => [CurrencyId, AccountId, Balance, Balance]),
        DustLost: sts.tuple(() => [CurrencyId, AccountId, Balance]),
        Endowed: sts.tuple(() => [CurrencyId, AccountId, Balance]),
        Reserved: sts.tuple(() => [CurrencyId, AccountId, Balance]),
        Transfer: sts.tuple(() => [CurrencyId, AccountId, AccountId, Balance]),
        Unreserved: sts.tuple(() => [CurrencyId, AccountId, Balance]),
    }
})

export const Balance = sts.bigint()

export const AccountId = sts.bytes()

export const CurrencyId: sts.Type<CurrencyId> = sts.closedEnum(() => {
    return  {
        DEXShare: sts.tuple(() => [TokenSymbol, TokenSymbol]),
        ERC20: EvmAddress,
        Token: TokenSymbol,
    }
})

export const EvmAddress = sts.bytes()

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

export const MemberCount = sts.number()

export const Hash = sts.bytes()

export const SystemEvent: sts.Type<SystemEvent> = sts.closedEnum(() => {
    return  {
        CodeUpdated: sts.unit(),
        ExtrinsicFailed: sts.tuple(() => [DispatchError, DispatchInfo]),
        ExtrinsicSuccess: DispatchInfo,
        KilledAccount: AccountId,
        NewAccount: AccountId,
        Remarked: sts.tuple(() => [AccountId, Hash]),
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
        Chilled: AccountId,
        EraPaid: sts.tuple(() => [EraIndex, Balance, Balance]),
        Kicked: sts.tuple(() => [AccountId, AccountId]),
        OldSlashingReportDiscarded: SessionIndex,
        PayoutStarted: sts.tuple(() => [EraIndex, AccountId]),
        Rewarded: sts.tuple(() => [AccountId, Balance]),
        Slashed: sts.tuple(() => [AccountId, Balance]),
        StakersElected: sts.unit(),
        StakingElectionFailed: sts.unit(),
        Unbonded: sts.tuple(() => [AccountId, Balance]),
        Withdrawn: sts.tuple(() => [AccountId, Balance]),
    }
})

export const SessionIndex = sts.number()

export const EraIndex = sts.number()

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

export const BlockNumber = sts.number()

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

export const BalanceOf = sts.bigint()

export const OffencesEvent: sts.Type<OffencesEvent> = sts.closedEnum(() => {
    return  {
        Offence: sts.tuple(() => [Kind, OpaqueTimeSlot]),
    }
})

export const OpaqueTimeSlot = sts.bytes()

export const Kind = sts.bytes()

export const MultisigEvent: sts.Type<MultisigEvent> = sts.closedEnum(() => {
    return  {
        MultisigApproval: sts.tuple(() => [AccountId, Timepoint, AccountId, CallHash]),
        MultisigCancelled: sts.tuple(() => [AccountId, Timepoint, AccountId, CallHash]),
        MultisigExecuted: sts.tuple(() => [AccountId, Timepoint, AccountId, CallHash, DispatchResult]),
        NewMultisig: sts.tuple(() => [AccountId, AccountId, CallHash]),
    }
})

export const CallHash = sts.bytes()

export const Timepoint: sts.Type<Timepoint> = sts.struct(() => {
    return  {
        height: BlockNumber,
        index: sts.number(),
    }
})

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

export const IndividualExposure: sts.Type<IndividualExposure> = sts.struct(() => {
    return  {
        who: AccountId,
        value: sts.bigint(),
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

export const RegistrarIndex = sts.number()

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
        ContractSelfdestructed: sts.tuple(() => [EvmAddress, EvmAddress]),
        ContractSetCode: EvmAddress,
        Created: sts.tuple(() => [EvmAddress, EvmAddress, sts.tuple(() => [sts.bigint(), sts.number()])]),
        CreatedFailed: sts.tuple(() => [EvmAddress, EvmAddress, ExitReason, sts.bytes(), sts.tuple(() => [sts.bigint(), sts.number()])]),
        Executed: sts.tuple(() => [EvmAddress, EvmAddress, sts.tuple(() => [sts.bigint(), sts.number()])]),
        ExecutedFailed: sts.tuple(() => [EvmAddress, EvmAddress, ExitReason, sts.bytes(), sts.tuple(() => [sts.bigint(), sts.number()])]),
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

export const H256 = sts.bytes()

export const H160 = sts.bytes()

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
        AuthorizedCall: sts.tuple(() => [Hash, sts.option(() => AccountId)]),
        Cancelled: sts.tuple(() => [PalletsOrigin, ScheduleTaskIndex]),
        Delayed: sts.tuple(() => [PalletsOrigin, ScheduleTaskIndex, BlockNumber]),
        Dispatched: DispatchResult,
        FastTracked: sts.tuple(() => [PalletsOrigin, ScheduleTaskIndex, BlockNumber]),
        RemovedAuthorizedCall: Hash,
        Scheduled: sts.tuple(() => [PalletsOrigin, ScheduleTaskIndex]),
        TriggeredCallBy: sts.tuple(() => [Hash, AccountId]),
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

export interface EventRecord {
    phase: Phase
    event: Type_276
    topics: Hash[]
}

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

export const EventRecord: sts.Type<EventRecord> = sts.struct(() => {
    return  {
        phase: Phase,
        event: Type_276,
        topics: sts.array(() => Hash),
    }
})

export const Phase: sts.Type<Phase> = sts.closedEnum(() => {
    return  {
        ApplyExtrinsic: sts.number(),
        Finalization: sts.unit(),
        Initialization: sts.unit(),
    }
})
