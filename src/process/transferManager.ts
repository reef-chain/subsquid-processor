import { Event } from "@subsquid/substrate-processor";
import { SignedData, TransferData } from "../interfaces/interfaces";
import { Account, ContractType, Transfer, TransferType, VerifiedContract } from "../model";
import { AccountManager } from "./accountManager";
import { processErc20Transfer } from "../process/transfer/erc20Transfer";
import { processErc721Transfer } from "../process/transfer/erc721Transfer";
import { processErc1155SingleTransfer } from "../process/transfer/erc1155SingleTransfer";
import { processErc1155BatchTransfer } from "../process/transfer/erc1155BatchTransfer";
import { processNativeTransfer } from "./transfer/nativeTransfer";
import { TokenHolderManager } from "./tokenHolderManager";
import { ctx, Fields } from "../processor";
import { REEF_CONTRACT_ADDRESS } from "../util/util";
import { extractReefswapRouterData } from "./transfer/reefswapRouterData";
import * as erc20 from "../abi/ERC20";
import * as erc721 from "../abi/ERC721";
import * as erc1155 from "../abi/ERC1155";

export class TransferManager {  
    transfersData: TransferData[] = [];
    tokenHolderManager: TokenHolderManager;

    constructor(tokenHolderManager: TokenHolderManager) {
        this.tokenHolderManager = tokenHolderManager;
    }
  
    async process(
        event: Event<Fields>, 
        accountManager: AccountManager,
        contract: VerifiedContract,
        signedData: SignedData | null,
        isNative: boolean = false
    ) {
        if (isNative) {
            this.transfersData.push(await processNativeTransfer(event, contract, signedData, accountManager));
            return;
        }

        switch (event.args.topics[0]) {
            case erc20.events.Transfer.topic:
                if (contract.type !== ContractType.ERC20) break;
                if (contract.id === REEF_CONTRACT_ADDRESS) {
                    // Already processed in processNativeTransfer. Add Reefswap action if needed.
                    const [, , value] = erc20.events.Transfer.decode(event.args.log || event.args);
                    const lastNativeIndex = this.transfersData.map(td => td.type).lastIndexOf(TransferType.Native);
                    // Sanity checks, should never happen
                    if (lastNativeIndex === -1 || value.toString() !== this.transfersData[lastNativeIndex].amount.toString()) break;
                    this.transfersData[lastNativeIndex].reefswapAction = extractReefswapRouterData(event, REEF_CONTRACT_ADDRESS);
                } else {
                    const erc20Transfer = await processErc20Transfer(event, contract, signedData, accountManager, this.tokenHolderManager);
                    if (erc20Transfer) this.transfersData.push(erc20Transfer);
                }
                break;
            case erc721.events.Transfer.topic:
                if (contract.type !== ContractType.ERC721) break;
                this.transfersData.push(await processErc721Transfer(event, contract, signedData, accountManager, this.tokenHolderManager));
                break;
            case erc1155.events.TransferSingle.topic:
                if (contract.type !== ContractType.ERC1155) break;
                this.transfersData.push(await processErc1155SingleTransfer(event, contract, signedData, accountManager, this.tokenHolderManager));
                break;
            case erc1155.events.TransferBatch.topic:
                if (contract.type !== ContractType.ERC1155) break;
                this.transfersData.push(...await processErc1155BatchTransfer(event, contract, signedData, accountManager, this.tokenHolderManager));
                break;
        }
    }
  
    async save(accounts: Map<string, Account>) {
        const transfers: Transfer[] = [];

        // TODO: process in parallel
        for (const transferData of this.transfersData) {            
            // Search to account in cached accounts
            let to = accounts.get(transferData.toAddress);
            if (!to) {
                // If not found, query the database
                to = await ctx.store.get(Account, transferData.toAddress);
                if (!to) {
                    ctx.log.error(`ERROR saving transfer: Account ${transferData.toAddress} not found`);
                    continue;
                }
            }

            // Search from account in cached accounts
            let from = accounts.get(transferData.fromAddress);
            if (!from) {
                // If not found, query the database
                from = await ctx.store.get(Account, transferData.fromAddress);
                if (!from) {
                    ctx.log.error(`ERROR saving transfer: Account ${transferData.fromAddress} not found`);
                    continue;
                } 
            }

            transfers.push(
                new Transfer({
                    ...transferData,
                    eventIndex: Number(transferData.id.split('-')[2]),
                    to: to,
                    from: from
                })
            );
        };

        await ctx.store.insert(transfers);
    }
}