import { ethers } from "ethers";
import { Event } from "@subsquid/substrate-processor";
import { TransferData } from "../../interfaces/interfaces";
import { TransferType, VerifiedContract } from "../../model";
import * as erc1155 from "../../abi/ERC1155";
import { findNativeAddress, toChainContext, toChecksumAddress } from "../../util/util";
import { TokenHolderManager } from "../tokenHolderManager";
import { AccountManager } from "../accountManager";
import { ctx, Fields, headReached, pinToIPFSEnabled } from "../../processor";
import { pinToIPFS } from "../../util/ipfs";

export const processErc1155SingleTransfer = async (
    event: Event<Fields>,
    token: VerifiedContract,
    feeAmount: bigint,
    accountManager: AccountManager,
    tokenHolderManager: TokenHolderManager
): Promise<TransferData> => {    
    const tokenAddress = token.id;
    const [, from, to, id, value ] = erc1155.events.TransferSingle.decode(event.args.log || event.args);

    if (pinToIPFSEnabled && from === ethers.ZeroAddress) {
        // It's a mint. Pin to IPFS.
        try {
            const uri = await new erc1155.Contract(toChainContext(ctx), event.block, tokenAddress).uri(id);
            pinToIPFS(uri.replace('{id}', id.toString().padStart(64, '0')));
        } catch (e) {
            ctx.log.error(`Failed to pin to IPFS: ${e}`);
        }
    }

    const toAddress = await findNativeAddress(event.block, to);
    const toEvmAddress = toChecksumAddress(to);
    if (toAddress !== '0x') accountManager.process(toAddress, event.block);
    if (ethers.isAddress(toEvmAddress) && toEvmAddress !== ethers.ZeroAddress) {
        let toBalance = BigInt(0);
        if (headReached) {
            // We start updating balance only after the head block has been reached
            try {
                toBalance = await new erc1155.Contract(toChainContext(ctx), event.block, tokenAddress).balanceOf(toEvmAddress, id);
            } catch (e) {}
        }
        tokenHolderManager.process(toAddress, toEvmAddress, BigInt(toBalance.toString()), event.block.timestamp!, token, Number(id));
    }
        
    const fromAddress = await findNativeAddress(event.block, from);
    const fromEvmAddress = toChecksumAddress(from);
    if (fromAddress !== '0x') accountManager.process(fromAddress, event.block)
    if (ethers.isAddress(fromEvmAddress) && fromEvmAddress !== ethers.ZeroAddress) {
        let fromBalance = BigInt(0);
        if (headReached) {
            try {
                fromBalance = await new erc1155.Contract(toChainContext(ctx), event.block, tokenAddress).balanceOf(fromEvmAddress, id);
            } catch (e) {}
        }
        tokenHolderManager.process(fromAddress, fromEvmAddress, BigInt(fromBalance.toString()), event.block.timestamp!, token, Number(id));
    }

    const transferData = {
        id: event.id,
        blockId: event.block.id,
        extrinsicId: event.extrinsic!.id,
        toAddress: toAddress,
        fromAddress: fromAddress,
        token: token,
        toEvmAddress: toChecksumAddress(to),
        fromEvmAddress: toChecksumAddress(from),
        type: TransferType.ERC1155,
        reefswapAction: null,
        amount: BigInt(value.toString()),
        success: true,
        timestamp: new Date(event.block.timestamp!),
        denom: null,
        nftId: BigInt(id.toString()),
        errorMessage: '',
        feeAmount: feeAmount
    };

    return transferData;
}