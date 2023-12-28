import { JsonFragment } from "ethers";
import { EvmEventStatus, EvmEventType, ExtrinsicStatus, ExtrinsicType, ReefswapAction, StakingType, TokenHolderType, TransferType, VerifiedContract } from "../model"

interface Fee {
    class: string,
    partialFee: bigint,
    weight: bigint
}

interface InclusionFee {
    baseFee: bigint,
    lenFee: bigint,
    adjustedWeightFee: bigint
}

interface FeeDetails {
    inclusionFee: InclusionFee,
}

export interface SignedData {
    fee: Fee,
    feeDetails: FeeDetails
}

export interface ExtrinsicData {
    id: string,
    blockId: string,
    index: number,
    hash: string,
    args: any,
    docs: string,
    method: string,
    section: string,
    signer: string,
    status: ExtrinsicStatus,
    errorMessage: string | undefined | null,
    type: ExtrinsicType,
    signedData: SignedData | unknown | undefined | null,
    timestamp: Date
}


export interface EventData {
    id: string,
    blockId: string,
    extrinsicId: string,
    index: number,
    phase: string,
    section: string,
    method: string,
    data: any,
    timestamp: Date
}

export interface AccountData {
    id: string; // native address
    evmAddress: string;
    blockId: string;
    identity: any;
    active: boolean;
    freeBalance: bigint;
    lockedBalance: bigint;
    availableBalance: bigint;
    reservedBalance: bigint;
    vestedBalance: bigint;
    votingBalance: bigint;
    nonce: number;
    evmNonce: number;
    timestamp: Date;
    blockHeight: number;
}

export interface ContractData {
    id: string;
    signerAddress: string;
    extrinsicId: string;
    bytecode: string;
    bytecodeContext: string;
    bytecodeArguments: string;
    gasLimit: bigint;
    storageLimit: bigint;
    timestamp: Date;
}

export interface EvmEventData {
    id: string;
    blockId: string;
    eventIndex: number;
    extrinsicIndex: number;
    contractAddress: string;
    dataRaw: any;
    dataParsed: any;
    method: string;
    type: EvmEventType;
    status: EvmEventStatus;
    topic0: string | undefined | null;
    topic1: string | undefined | null;
    topic2: string | undefined | null;
    topic3: string | undefined | null;
}

export interface TransferData {
    id: string;
    blockId: string;
    extrinsicId: string;
    toAddress: string;
    fromAddress: string;
    token: VerifiedContract;
    toEvmAddress: string;
    fromEvmAddress: string;
    type: TransferType;
    reefswapAction: ReefswapAction | undefined | null;
    amount: bigint;
    success: boolean;
    timestamp: Date;
    denom: string | undefined | null;
    nftId: bigint | undefined | null;
    errorMessage: string | undefined | null;
    feeAmount: bigint;
};

export interface TokenHolderData {
    id: string;
    token: VerifiedContract;
    signerAddress: string | null;
    evmAddress: string | null;
    nftId: bigint | null;
    type: TokenHolderType;
    balance: bigint;
    timestamp: Date;
}

export interface StakingData {
    id: string;
    signerAddress: string;
    type: StakingType;
    amount: bigint;
    timestamp: Date;
}
  
export type TokenType = 'ERC20' | 'ERC721' | 'ERC1155';

export type ABI = JsonFragment[];

export interface ABIS {
    [name: string]: ABI;
}

export interface ERC721Data {
    name: string;
    symbol: string;
}
export interface ERC20Data extends ERC721Data {
    decimals: number;
}

export interface IdentityData {
    display: string;
    email: string;
    image: string;
    judgements: [number, any][];
    legal: string;
    other: any[];
    pgp: any;
    riot: string;
    twitter: string;
    web: string;
}

export interface NewBlockData {
    blockHeight: number;
    blockId: string;
    blockHash: string;
    updatedAccounts: {
        REEF20Transfers: string[];
        REEF721Transfers: string[];
        REEF1155Transfers: string[];
        boundEvm: string[];
    },
    updatedContracts: string[];
};