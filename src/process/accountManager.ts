import { EntityManager, Not } from "typeorm";
import * as ss58 from '@subsquid/ss58';
import { AccountData } from "../interfaces/interfaces";
import { Account, Block, TokenHolder, TokenHolderType, Transfer, VerifiedContract } from "../model";
import { Fields, ctx, emptyAccount, headReached, reefVerifiedContract } from "../processor";
import { evmAccounts, evm, identity } from "../types/storage";
import { extractIdentity, REEF_CONTRACT_ADDRESS, toChecksumAddress } from "../util/util";
import { TokenHolderManager } from "./tokenHolderManager";
import { getBalancesAccount } from "../util/balances/balances";
import { AccountBalances } from "../util/balances/types";
import { TransferManager } from "./transferManager";
import { BlockHeader } from "@subsquid/substrate-processor";

interface TokenHolderRow {
    id: string;
    token_id: string;
    nft_id: string | null;
    balance: string;
    timestamp: Date;
}

interface EntityIdRow {
    id: string;
}

export class AccountManager {  
    accountsData: Map<string, AccountData> = new Map();
    tokenHolderManager: TokenHolderManager;
    transferManager: TransferManager;
    allClaimedEvmNativeAddresses: Set<string> = new Set();
    newClaimedEvmAddresses: string[] = [];

    constructor(tokenHolderManager: TokenHolderManager, transferManager: TransferManager) {
        this.tokenHolderManager = tokenHolderManager;
        this.transferManager = transferManager;
    }
  
    async process(
        address: string,
        blockHeader: BlockHeader<Fields>,
        active = true,
        evmClaim = false
    ): Promise<AccountData> {
        let accountData = this.accountsData.get(address);
        
        if (!active) { await this.updateOnKilledAccount(address); }
        
        // If account does not exist or block height is lower than current, we extract its data and store it
        if (!accountData || accountData.blockHeight < blockHeader.height) {
            accountData = await this.getAccountData(address, blockHeader, active);
            this.accountsData.set(address, accountData);
            this.tokenHolderManager.process(address, '', accountData.freeBalance, blockHeader.timestamp!, reefVerifiedContract);
        } else if (!active) { // If account already exists and is killed, we update the active flag
            accountData.active = false;
            this.accountsData.set(address, accountData);
        }

        if (evmClaim) { await this.updateOnEvmAccountBound(address, accountData.evmAddress); }

        return accountData;
    }
  
    async save(blocks: Map<string, Block>): Promise<Map<string, Account>> {
        const accounts: Map<string, Account> = new Map();

        this.accountsData.forEach(accountData => {
            const block = blocks.get(accountData.blockId);
            if (!block) {
                ctx.log.error(`ERROR saving account: Block ${accountData.blockId} not found`);
                return;
            }
            
            accounts.set(accountData.id, new Account ({
                ...accountData,
                block: block
            }));
        });
    
        await ctx.store.save([...accounts.values()]);
        
        for (const evmAddress of this.newClaimedEvmAddresses) {
            const account = [...accounts.values()].find(account => account.evmAddress === evmAddress);
            if (!account) { 
                ctx.log.error(`ERROR updating token holders and transfers: Account with EVM address ${evmAddress} not found`);
                continue; 
            }
            await this.updateTokenHoldersAndTransferOnEvmAccountBound(account, evmAddress);
        }

        return accounts;
    }

    private updateOnEvmAccountBound = async (
        nativeAddress: string, 
        evmAddress: string
    ) => {        
        // Update token holders in memory
        this.tokenHolderManager.tokenHoldersData.forEach(tokenHolderData => {
            if (tokenHolderData.evmAddress === evmAddress) {
                tokenHolderData.evmAddress = "";
                tokenHolderData.signerAddress = nativeAddress;
                tokenHolderData.type = TokenHolderType.Account;
                tokenHolderData.id = tokenHolderData.id.replace(evmAddress, nativeAddress);
            }
        });

        // Update transfers in memory
        this.transferManager.transfersData.forEach(transferData => {
            if (transferData.toEvmAddress === evmAddress) {
                transferData.toAddress = nativeAddress;
            } else if (transferData.fromEvmAddress === evmAddress) {
                transferData.fromAddress = nativeAddress;
            }
        });

        this.allClaimedEvmNativeAddresses.add(nativeAddress);
        const account = await ctx.store.get(Account, nativeAddress);
        if (!account) {
            // Account does not exist in DB, so we update token holders and transfers after saving the account
            this.newClaimedEvmAddresses.push(evmAddress);
            return;
        }
    
        await this.updateTokenHoldersAndTransferOnEvmAccountBound(account, evmAddress);
    };

    private updateTokenHoldersAndTransferOnEvmAccountBound = async (
        account: Account, 
        evmAddress: string
    ) => {
        const manager = this.getEntityManager();

        // Update token holders in DB without loading relations for every row.
        const tokenHolderRows = await manager.query(
            `SELECT id, token_id, nft_id, balance, timestamp
             FROM token_holder
             WHERE evm_address = $1`,
            [evmAddress]
        ) as TokenHolderRow[];
        if (tokenHolderRows.length > 0) {
            await ctx.store.remove(TokenHolder, tokenHolderRows.map((tokenHolder) => tokenHolder.id));
            await ctx.store.save(tokenHolderRows.map((tokenHolder) => new TokenHolder({
                id: tokenHolder.id.replace(evmAddress, account.id),
                token: new VerifiedContract({ id: tokenHolder.token_id }),
                signer: account,
                evmAddress: "",
                nftId: tokenHolder.nft_id == null ? null : BigInt(tokenHolder.nft_id),
                type: TokenHolderType.Account,
                balance: BigInt(tokenHolder.balance),
                timestamp: new Date(tokenHolder.timestamp)
            })));
        }

        // Update transfers in DB by touching only the foreign key that changed.
        await this.rebindTransfersToAccount("to_evm_address", "to", evmAddress, account);
        await this.rebindTransfersToAccount("from_evm_address", "from", evmAddress, account);
    }
        

    private updateOnKilledAccount = async (nativeAddress: string) => {
        let unboundedEvmAddress = this.accountsData.get(nativeAddress)?.evmAddress;
        if (!unboundedEvmAddress || unboundedEvmAddress === "" || unboundedEvmAddress === "0x") {
            const account = await ctx.store.findOneBy(Account, { id: nativeAddress });
            if (account && account.evmAddress) {
                unboundedEvmAddress = account.evmAddress;
            } else {
                // Killed account did not have an EVM address bound
                return;
            }
        }

        // Update token holders in memory
        this.tokenHolderManager.tokenHoldersData.forEach(tokenHolderData => {
            if (tokenHolderData.signerAddress === nativeAddress && tokenHolderData.token.id !== REEF_CONTRACT_ADDRESS) {
                tokenHolderData.evmAddress = unboundedEvmAddress!;
                tokenHolderData.signerAddress = "";
                tokenHolderData.type = TokenHolderType.Contract;
                tokenHolderData.id = tokenHolderData.id.replace(nativeAddress, unboundedEvmAddress!);
            }
        });

        // Update transfers in memory
        this.transferManager.transfersData.forEach(transferData => {
            if (transferData.toAddress === nativeAddress) {
                if (transferData.token.id === REEF_CONTRACT_ADDRESS) {
                    transferData.toEvmAddress = "";
                } else {
                    transferData.toAddress = "0x";
                }
            } else if (transferData.fromAddress === nativeAddress) {
                if (transferData.token.id === REEF_CONTRACT_ADDRESS) {
                    transferData.fromEvmAddress = "";
                } else {
                    transferData.fromAddress = "0x";
                }
            }
        });

        const manager = this.getEntityManager();

        // Update token holders in DB without relation-heavy reads.
        const tokenHolderRows = await manager.query(
            `SELECT id, token_id, nft_id, balance, timestamp
             FROM token_holder
             WHERE signer_id = $1 AND token_id != $2`,
            [nativeAddress, REEF_CONTRACT_ADDRESS]
        ) as TokenHolderRow[];
        if (tokenHolderRows.length > 0) {
            await ctx.store.remove(TokenHolder, tokenHolderRows.map((tokenHolder) => tokenHolder.id));
            await ctx.store.save(tokenHolderRows.map((tokenHolder) => new TokenHolder({
                id: tokenHolder.id.replace(nativeAddress, unboundedEvmAddress!),
                token: new VerifiedContract({ id: tokenHolder.token_id }),
                signer: null,
                evmAddress: unboundedEvmAddress,
                nftId: tokenHolder.nft_id == null ? null : BigInt(tokenHolder.nft_id),
                type: TokenHolderType.Contract,
                balance: BigInt(tokenHolder.balance),
                timestamp: new Date(tokenHolder.timestamp)
            })));
        }

        await this.clearNativeTransferBindings("to", nativeAddress);
        await this.clearNativeTransferBindings("from", nativeAddress);
    }
  
    private async getAccountData(address: string, blockHeader: BlockHeader<Fields>, active: boolean): Promise<AccountData> {
        let evmAddr = '';
        let identity = null;
        let balances: AccountBalances = {
            freeBalance: 0n,
            lockedBalance: 0n,
            availableBalance: 0n,
            reservedBalance: 0n,
            vestingLocked: 0n,
            votingBalance: 0n,
            accountNonce: 0,
        };
        let evmNonce = 0;

        const addressBytes = ss58.decode(address).bytes;
        if (headReached) {
            // We start updating balances and identity only after the head block has been reached
            let evmAddress;
            [evmAddress, balances, identity] = await Promise.all([
                this.getEvmAddress(blockHeader, addressBytes),
                getBalancesAccount(blockHeader, addressBytes),
                this.getIdentity(blockHeader, addressBytes),
            ]);
            if (evmAddress) { 
                evmAddr = toChecksumAddress(evmAddress);
                evmNonce = await this.getEvmNonce(blockHeader, evmAddress);
            }
        } else {
            const addressBytes = ss58.decode(address).bytes;
            const evmAddress = await this.getEvmAddress(blockHeader, addressBytes);
            if (evmAddress) { evmAddr = toChecksumAddress(evmAddress) }
        }

        return {
            id: address,
            evmAddress: evmAddr,
            identity: identity,
            active: active,
            freeBalance: balances.freeBalance,
            lockedBalance: balances.lockedBalance,
            availableBalance: balances.availableBalance,
            reservedBalance: balances.reservedBalance,
            vestedBalance: balances.vestingLocked,
            votingBalance: balances.votingBalance,
            nonce: balances.accountNonce,
            evmNonce: evmNonce,
            blockHeight: blockHeader.height,
            timestamp: new Date(blockHeader.timestamp!),
            blockId: blockHeader.id,
        };
    }

    private async getEvmAddress(blockHeader: BlockHeader<Fields>, address: string) {
        const storageV5 = evmAccounts.evmAddresses.v5;
        if (storageV5.is(blockHeader)) {
            return storageV5.get(blockHeader, address).then(
                (res: string | undefined) => {
                    return res;
                }
            );
        }

        return undefined;
    }

    private async getIdentity(blockHeader: BlockHeader<Fields>, address: string) {
        const storageV5 = identity.identityOf.v5;
        if (storageV5.is(blockHeader)) {
            const identityRaw = await storageV5.get(blockHeader, address);
            return extractIdentity(identityRaw);
        }

        return undefined;
    }

    private async getEvmNonce(blockHeader: BlockHeader<Fields>, evmAddress: string) {
        if (evmAddress === '') return 0;

        const storageV5 = evm.accounts.v5;
        if (storageV5.is(blockHeader)) {
            const accountInfo = await storageV5.get(blockHeader, evmAddress);
            return accountInfo?.nonce || 0;
        }

        return 0;
    }

    private getEntityManager(): EntityManager {
        return (ctx.store as unknown as { em: () => EntityManager }).em();
    }

    private async rebindTransfersToAccount(
        addressColumn: "to_evm_address" | "from_evm_address",
        relation: "to" | "from",
        evmAddress: string,
        account: Account
    ): Promise<void> {
        const manager = this.getEntityManager();
        const transferRows = await manager.query(
            `SELECT id
             FROM transfer
             WHERE ${addressColumn} = $1`,
            [evmAddress]
        ) as EntityIdRow[];
        if (transferRows.length === 0) return;

        await ctx.store.save(transferRows.map((transferRow) => {
            const transfer = new Transfer({ id: transferRow.id });
            transfer[relation] = account;
            return transfer;
        }));
    }

    private async clearNativeTransferBindings(
        relation: "to" | "from",
        nativeAddress: string
    ): Promise<void> {
        const manager = this.getEntityManager();
        const relationColumn = `${relation}_id`;
        const evmColumn = `${relation}_evm_address`;

        const reefTransfers = await manager.query(
            `SELECT id
             FROM transfer
             WHERE ${relationColumn} = $1
               AND token_id = $2
               AND COALESCE(${evmColumn}, '') != ''`,
            [nativeAddress, REEF_CONTRACT_ADDRESS]
        ) as EntityIdRow[];
        if (reefTransfers.length > 0) {
            await ctx.store.save(reefTransfers.map((transferRow) => {
                const transfer = new Transfer({ id: transferRow.id });
                transfer[`${relation}EvmAddress` as "toEvmAddress" | "fromEvmAddress"] = "";
                return transfer;
            }));
        }

        const contractTransfers = await manager.query(
            `SELECT id
             FROM transfer
             WHERE ${relationColumn} = $1
               AND token_id != $2`,
            [nativeAddress, REEF_CONTRACT_ADDRESS]
        ) as EntityIdRow[];
        if (contractTransfers.length > 0) {
            await ctx.store.save(contractTransfers.map((transferRow) => {
                const transfer = new Transfer({ id: transferRow.id });
                transfer[relation] = emptyAccount;
                return transfer;
            }));
        }
    }
}

  
