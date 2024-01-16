import { Event } from "@subsquid/substrate-processor";
import { AccountManager } from "../accountManager";
import { SignedData, TransferData } from "../../interfaces/interfaces";
import { TransferType, VerifiedContract } from "../../model";
import { getErrorMessage, hexToNativeAddress } from "../../util/util";
import { Fields, SUPPORT_HOT_BLOCKS } from "../../processor";

export const processNativeTransfer = async (
    event: Event<Fields>, 
    contract: VerifiedContract,
    signedData: SignedData | null,
    accountManager: AccountManager
): Promise<TransferData> => {
    const from = hexToNativeAddress(event.args[0]);
    const to = hexToNativeAddress(event.args[1]);
    const amount = event.args[2];

    const fromAccountData = await accountManager.process(from, event.block);
    const toAccountData = await accountManager.process(to, event.block);

    let errorMessage = "";
    if (event.extrinsic!.error) {
        const section = event.extrinsic!.call!.name.split(".")[0];
        errorMessage = getErrorMessage(event.block._runtime, event.extrinsic!.error, section);
    }

    const transferData = {
        id: event.id,
        blockHeight: event.block.height,
        blockHash: event.block.hash,
        finalized: SUPPORT_HOT_BLOCKS ? false : true,
        extrinsicId: event.extrinsic!.id,
        extrinsicHash: event.extrinsic!.hash,
        extrinsicIndex: event.extrinsic!.index,
        signedData,
        fromAddress: from,
        toAddress: to,
        token: contract,
        fromEvmAddress: fromAccountData.evmAddress,
        toEvmAddress: toAccountData.evmAddress,
        type: TransferType.Native,
        reefswapAction: null,
        amount: BigInt(amount),
        success: event.extrinsic!.success,
        timestamp: new Date(event.block.timestamp!),
        denom: 'REEF',
        nftId: null,
        errorMessage: errorMessage
    };

    return transferData;
}