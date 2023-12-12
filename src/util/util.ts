import { ethers } from "ethers";
import * as ss58 from "@subsquid/ss58"
import { BlockHeader, DataHandlerContext } from "@subsquid/substrate-processor";
import { 
  Runtime,
} from "@subsquid/substrate-runtime";
import { ERC20Data, IdentityData } from "../interfaces/interfaces";
import { evmAccounts } from "../types/storage";
import { Data_Raw5, Registration } from "../types/v5";
import { FunctionMetadataV9, Metadata, MetadataModule } from "./interfaces";

export const REEF_CONTRACT_ADDRESS = '0x0000000000000000000000000000000001000000';
export const REEF_DEFAULT_DATA: ERC20Data = {
    decimals: 18,
    symbol: 'REEF',
    name: 'Reef',
};

export const hexToNativeAddress = (address: string | undefined): string => {
    if (!address) return '0x';
    try {
        const buffer = Buffer.from(address.split('0x')[1], "hex");
        return ss58.codec('substrate').encode(new Uint8Array(buffer));
    } catch (error) {
        console.error("Error converting hex value to native address:", error);
        return '0x';
    }
}

export const toChecksumAddress = (address: string): string => ethers.getAddress(address.trim().toLowerCase());

export const blockIdToHeight = (blockId: string): number => {
    return parseInt(blockId.split('-')[0]);
}

export const findNativeAddress = async (
    blockHeader: BlockHeader, 
    evmAddress: string
): Promise<string> => {
    if (!ethers.isAddress(evmAddress) || evmAddress === ethers.ZeroAddress) return '0x';

    const storageV5 = evmAccounts.accounts.v5;
    if (storageV5.is(blockHeader)) {
        const account = await storageV5.get(blockHeader, evmAddress);
        return account ? ss58.codec('substrate').encode(account) : '0x';
    } else {
        throw new Error("Unknown storage version");
    }
}

export const toCamelCase = (input: string): string => {
    let result = "";
  
    for (let word of input.split("_")) {
      result += word[0].toUpperCase() + word.substring(1);
    }

    return result[0].toLowerCase() + result.substring(1);
}

export const sleep = async (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

const extractJudgements = (judgements: [number, any][]): [number, any][] => {
  for (const judgement of judgements) {
    judgement[1] = { [judgement[1].__kind]: judgement[1].value || null };
  }
  return judgements;
};

export const extractIdentity = (identityRaw: Registration | undefined): Partial<IdentityData> => {
  const identity: Partial<IdentityData> = { judgements: [] }
  if (!identityRaw) return identity;

  const display = (identityRaw.info.display as Data_Raw5).value;
  if (display) identity.display = display;

  const email = (identityRaw.info.email as Data_Raw5).value;
  if (email) identity.email = email;

  const legal = (identityRaw.info.legal as Data_Raw5).value;
  if (legal) identity.legal = legal;

  const riot = (identityRaw.info.riot as Data_Raw5).value;
  if (riot) identity.riot = riot;

  const twitter = (identityRaw.info.twitter as Data_Raw5).value;
  if (twitter) identity.twitter = twitter;

  const web = (identityRaw.info.web as Data_Raw5).value;
  if (web) identity.web = web;

  const image = (identityRaw.info.image as Data_Raw5).value;
  if (image) identity.image = image;

  const pgp = identityRaw.info.pgpFingerprint;
  if (pgp) identity.pgp = pgp;

  const additional = identityRaw.info.additional;
  if (additional && additional.length) identity.other = additional;

  identity.judgements = extractJudgements(identityRaw.judgements);

  return identity;
}

export const getErrorMessage = (runtime: Runtime, error: any, section: string): string => {
  const metadata = (runtime.metadata.value) as unknown as Metadata;
  const module = metadata.modules.find((module: MetadataModule) => module.name === section);

  let errorMessage = "";
  if (error.value?.error) {
      const err = module?.errors ? module.errors[error.value.error as number] : null;
      errorMessage = err ? `${section}.${err.name}:${err.docs}` : "";
  } else  {
      errorMessage = error.__kind || "";
  }
  return errorMessage;
}

export const getDocs = (runtime: Runtime, section: string, method: string): string => {
  const metadata = (runtime.metadata.value) as unknown as Metadata;
  const module = metadata.modules.find((module: MetadataModule) => module.name === section);

  let docs = [""];
  if (module && module.calls) {
    const call = module.calls.find((call: FunctionMetadataV9) => call.name === method);
    if (call) {
      docs = call.docs;
    }
  }
  return docs.toString();
}

// TODO: Temporary solution to initialize EVM contracts. SDK will accept DataHandlerContext as a parameter in the future.
export const toChainContext = (ctx: DataHandlerContext<any, any>): any => {
  return {_chain: {client: ctx._chain.rpc}};
}