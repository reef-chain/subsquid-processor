import { ethers } from "ethers";
import { Event } from "@subsquid/substrate-processor";
import { TransferData } from "../../interfaces/interfaces";
import { TransferType, VerifiedContract } from "../../model";
import * as erc1155 from "../../abi/ERC1155";
import { findNativeAddress, toChainContext, toChecksumAddress } from "../../util/util";
import { ctx, Fields, headReached, pinToIPFSEnabled } from "../../processor";
import { TokenHolderManager } from "../tokenHolderManager";
import { AccountManager } from "../accountManager";
import { pinToIPFS } from "../../util/ipfs";

export const processErc1155BatchTransfer = async (
    event: Event<Fields>,
    token: VerifiedContract,
    feeAmount: bigint,
    accountManager: AccountManager,
    tokenHolderManager: TokenHolderManager
): Promise<TransferData[]> => {    
    const transfersData: TransferData[] = [];
    const tokenAddress = token.id;
    const [, from, to, ids, values_ ] = erc1155.events.TransferBatch.decode(event.args.log || event.args);

    if (pinToIPFSEnabled && from === ethers.ZeroAddress) {
        // It's a mint. Pin to IPFS.
        for (let i = 0; i < ids.length; i++) {
            try {
                const uri = await new erc1155.Contract(toChainContext(ctx), event.block, tokenAddress).uri(ids[i]);
                pinToIPFS(uri.replace('{id}', ids[i].toString().padStart(64, '0')));
            } catch (e) {
                ctx.log.error(`Failed to pin to IPFS: ${e}`);
            }
        }
    }

    const toAddress = await findNativeAddress(event.block, to);
    const fromAddress = await findNativeAddress(event.block, from);
    const toEvmAddress = toChecksumAddress(to);
    const fromEvmAddress = toChecksumAddress(from);

    if (toAddress !== '0x') accountManager.process(toAddress, event.block);
    if (ethers.isAddress(toEvmAddress) && toEvmAddress !== ethers.ZeroAddress) {
        let toBalances = Array(ids.length).fill(BigInt(0));
        if (headReached) {
            // We start updating balances only after the head block has been reached
            try {
                toBalances = await new erc1155.Contract(toChainContext(ctx), event.block, tokenAddress).balanceOfBatch(Array.from({length: ids.length}, () => toEvmAddress), ids);
            } catch (e) {}
        }
        for (let i = 0; i < ids.length; i++) {
            tokenHolderManager.process(toAddress, toEvmAddress, BigInt(toBalances[i].toString()), event.block.timestamp!, token, Number(ids[i]));
        }
    }

    if (fromAddress !== '0x') accountManager.process(fromAddress, event.block);
    if (ethers.isAddress(fromEvmAddress) && fromEvmAddress !== ethers.ZeroAddress) {
        let fromBalances = Array(ids.length).fill(BigInt(0));
        if (headReached) {
            // We start updating balances only after the head block has been reached
            try {
                fromBalances = await new erc1155.Contract(toChainContext(ctx), event.block, tokenAddress).balanceOfBatch(Array.from({length: ids.length}, () => fromEvmAddress), ids);
            } catch (e) {}
        }
        for (let i = 0; i < ids.length; i++) {
            tokenHolderManager.process(fromAddress, fromEvmAddress, BigInt(fromBalances[i].toString()), event.block.timestamp!, token, Number(ids[i]));
        }
    }

    for (let i = 0; i < ids.length; i++) {
        transfersData.push({
            id: `${event.id}-${i}`,
            blockId: event.block.id,
            extrinsicId: event.extrinsic!.id,
            toAddress: toAddress,
            fromAddress: fromAddress,
            token: token,
            toEvmAddress: toEvmAddress,
            fromEvmAddress: fromEvmAddress,
            type: TransferType.ERC1155,
            amount: BigInt(values_[i].toString()),
            success: true,
            timestamp: new Date(event.block.timestamp!),
            denom: null,
            nftId: BigInt(ids[i].toString()),
            errorMessage: '',
            feeAmount: feeAmount
        });
    }

    return transfersData;
}