import { ethers } from "ethers";
import { Event } from "@subsquid/substrate-processor";
import { ERC20Data, SignedData, TransferData } from "../../interfaces/interfaces";
import { TransferType, VerifiedContract } from "../../model";
import * as erc20 from "../../abi/ERC20";
import { findNativeAddress, toChainContext, toChecksumAddress } from "../../util/util";
import { AccountManager } from "../accountManager";
import { TokenHolderManager } from "../tokenHolderManager";
import { ctx, Fields, headReached, SUPPORT_HOT_BLOCKS } from "../../processor";
import { extractReefswapRouterData } from "./reefswapRouterData";

export const processErc20Transfer = async (
    event: Event<Fields>,
    token: VerifiedContract,
    signedData: SignedData | null,
    accountManager: AccountManager,
    tokenHolderManager: TokenHolderManager
): Promise<TransferData | undefined> => {
    const tokenAddress = token.id;
    const [from, to, value] = erc20.events.Transfer.decode(event.args.log || event.args);
    
    const toAddress = await findNativeAddress(event.block, to);
    const toEvmAddress = toChecksumAddress(to);
    if (toAddress !== '0x') accountManager.process(toAddress, event.block);
    if (ethers.isAddress(toEvmAddress) && toEvmAddress !== ethers.ZeroAddress) {
        let toBalance = BigInt(0);
        if (headReached) {
            // We start updating balance only after the head block has been reached
            try {
                toBalance = await new erc20.Contract(toChainContext(ctx), event.block, tokenAddress).balanceOf(toEvmAddress);
            } catch (e) {}
        }
        tokenHolderManager.process(toAddress, toEvmAddress, BigInt(toBalance.toString()), event.block.timestamp!, token);
    }
        
    const fromAddress = await findNativeAddress(event.block, from);
    const fromEvmAddress = toChecksumAddress(from);
    if (fromAddress !== '0x') accountManager.process(fromAddress, event.block)
    if (ethers.isAddress(fromEvmAddress) && fromEvmAddress !== ethers.ZeroAddress) {
        let fromBalance = BigInt(0);
        if (headReached) {
            // We start updating balance only after the head block has been reached
            try {
                fromBalance = await new erc20.Contract(toChainContext(ctx), event.block, tokenAddress).balanceOf(fromEvmAddress);
            } catch (e) {}
        }
        tokenHolderManager.process(fromAddress, fromEvmAddress, BigInt(fromBalance.toString()), event.block.timestamp!, token);
    }

    const reefswapAction = extractReefswapRouterData(event, tokenAddress);

    const transferData = {
        id: event.id,
        blockHeight: event.block.height,
        blockHash: event.block.hash,
        finalized: SUPPORT_HOT_BLOCKS ? false : true,
        extrinsicId: event.extrinsic!.id,
        extrinsicHash: event.extrinsic!.hash,
        extrinsicIndex: event.extrinsic!.index,
        signedData,
        toAddress: toAddress,
        fromAddress: fromAddress,
        token: token,
        toEvmAddress: toEvmAddress,
        fromEvmAddress: fromEvmAddress,
        type: TransferType.ERC20,
        reefswapAction: reefswapAction,
        amount: BigInt(value.toString()),
        success: true,
        timestamp: new Date(event.block.timestamp!),
        denom: (token.contractData as ERC20Data).symbol,
        nftId: null,
        errorMessage: ''
    };

    return transferData;
}