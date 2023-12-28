import { Not } from "typeorm";
import { BlockHeader } from "@subsquid/substrate-processor";
import * as ss58 from '@subsquid/ss58';
import { Account, ContractType, TokenHolder } from "../model";
import { Fields, ctx } from "../processor";
import { evmAccounts, evm, identity } from "../types/storage";
import { extractIdentity, REEF_CONTRACT_ADDRESS, sleep, toChainContext } from "../util/util";
import * as erc20 from "../abi/ERC20";
import * as erc721 from "../abi/ERC721";
import * as erc1155 from "../abi/ERC1155";
import { getBalancesAccount } from "../util/balances/balances";

const updateAccounts = async (accounts: Account[], blockHeader: BlockHeader<Fields>) => {
    // Get current EVM addresses, native balances and identities
    const addresses = accounts.map((a) => { return ss58.decode(a.id).bytes });
    let [evmAddresses, balances, identities] = await Promise.all([
        getEvmAddresses(blockHeader, addresses),
        getNativeBalances(blockHeader, addresses),
        getIdentities(blockHeader, addresses)
    ]);

    // Update accounts
    accounts.forEach((account, i) => {
        account.evmAddress = evmAddresses ? evmAddresses[i] : '';
        account.identity = identities ? identities[i] : null;
        account.freeBalance = balances ? balances[i].freeBalance : 0n;
        account.lockedBalance = balances ? balances[i].lockedBalance : 0n;
        account.availableBalance = balances ? balances[i].availableBalance : 0n;
        account.reservedBalance = balances ? balances[i].reservedBalance : 0n;
        account.vestedBalance = balances ? balances[i].vestingLocked : 0n;
        account.votingBalance = balances ? balances[i].votingBalance : 0n;
        account.nonce = balances ? balances[i].accountNonce : 0;
    });

    // Get and update EVM nonces
    evmAddresses = evmAddresses?.filter((a) => a !== '');
    if (evmAddresses?.length) {
        const evmNonces = await getEvmNonces(blockHeader, evmAddresses);
        if (evmNonces && evmNonces.size > 0) {
            accounts.forEach((account) => {
                if (account.evmAddress && evmNonces.get(account.evmAddress)) {
                    account.evmNonce = evmNonces.get(account.evmAddress)!;
                }
            });
        }
    }

    // Update accounts in DB
    await ctx.store.save(accounts);
    ctx.log.info(`Accounts updated`);
}

const updateNativeTokenHolders = async (nativeTokenHolders: TokenHolder[]) => {
    // Update REEF balances
    nativeTokenHolders.forEach((tokenHolder) => {
        tokenHolder.balance = tokenHolder.signer?.freeBalance || 0n;
    });

    // Update token holders in DB
    await ctx.store.save(nativeTokenHolders);
    ctx.log.info(`Native token holders updated`);
}

const updateErc20TokenHolders = async (erc20TokenHolders: TokenHolder[], blockHeader: BlockHeader<Fields>) => {
    // Update balances
    await updateErc20Balances(blockHeader, erc20TokenHolders);

    // Update token holders in DB
    await ctx.store.save(erc20TokenHolders);
    ctx.log.info(`ERC20 token holders updated`);
}

const updateErc721TokenHolders = async (erc721TokenHolders: TokenHolder[], blockHeader: BlockHeader<Fields>) => {
    // Update balances
    await updateErc721Balances(blockHeader, erc721TokenHolders);

    // Update token holders in DB
    await ctx.store.save(erc721TokenHolders);
    ctx.log.info(`ERC721 token holders updated`);
}

const updateErc1155TokenHolders = async (erc1155TokenHolders: TokenHolder[], blockHeader: BlockHeader<Fields>) => {
    // Update balances
    await updateErc1155Balances(blockHeader, erc1155TokenHolders);

    // Update token holders in DB
    await ctx.store.save(erc1155TokenHolders);
    ctx.log.info(`ERC1155 token holders updated`);
}

const getEvmAddresses = async(blockHeader: BlockHeader<Fields>, addresses: string[]) => {
    const storageV5 = evmAccounts.evmAddresses.v5;
    if (storageV5.is(blockHeader)) {
        const res = await storageV5.getMany(blockHeader, addresses);
        return res.map((r) => r ? r : '');
    }

    return undefined;
}

const getIdentities = async (blockHeader: BlockHeader<Fields>, addresses: string[]) => {
    const storageV5 = identity.identityOf.v5;
    if (storageV5.is(blockHeader)) {
        const identityRaws = await storageV5.getMany(blockHeader, addresses);
        return identityRaws.map(identityRaw => extractIdentity(identityRaw));
    }
    
    return undefined;
}

const getEvmNonces = async (blockHeader: BlockHeader<Fields>, evmAddresses: string[]) => {
    let accountsInfo = [];    
    const storageV5 = evm.accounts.v5;
    if (storageV5.is(blockHeader)) {
        accountsInfo = await storageV5.getMany(blockHeader, evmAddresses);
    } else {
        return undefined;
    }

    const evmNonces: Map<string, number> = new Map();
    accountsInfo.forEach((accountInfo, index) => {
        evmNonces.set(evmAddresses[index], accountInfo?.nonce || 0);
     });

    return evmNonces;
}

const getNativeBalances = async (blockHeader: BlockHeader<Fields>, addresses: string[]) => {
    // TODO: Adapt getBalancesAccount to work with process multiple addresses
    return await Promise.all(
        addresses.map((address) => getBalancesAccount(blockHeader, address))
    );
}

const updateErc20Balances = async (blockHeader: BlockHeader<Fields>, tokenHolders: TokenHolder[]) => {
    await Promise.all(
        tokenHolders.map((tokenHolder) => {
            const ownerAddress = tokenHolder.signer?.evmAddress || tokenHolder.evmAddress!;
            if (!ownerAddress || ownerAddress === '' || ownerAddress === '0x') {
                tokenHolder.balance = BigInt('0');
                return Promise.resolve();
            }
            new erc20.Contract(toChainContext(ctx), blockHeader, tokenHolder.token.id).balanceOf(ownerAddress)
                .then((balance) => { tokenHolder.balance = BigInt(balance.toString()) });
        })
    );
}

const updateErc721Balances = async (blockHeader: BlockHeader<Fields>, tokenHolders: TokenHolder[]) => {
    await Promise.all(
        tokenHolders.map((tokenHolder) => {
            const ownerAddress = tokenHolder.signer?.evmAddress || tokenHolder.evmAddress!;
            if (!ownerAddress || ownerAddress === '' || ownerAddress === '0x') {
                tokenHolder.balance = BigInt('0');
                return Promise.resolve();
            }
            new erc721.Contract(toChainContext(ctx), blockHeader, tokenHolder.token.id).balanceOf(ownerAddress)
                .then((balance) => { tokenHolder.balance = BigInt(balance.toString()) });
        })
    );
}

const updateErc1155Balances = async (blockHeader: BlockHeader<Fields>, tokenHolders: TokenHolder[]) => {
    // TODO: Group by contract and call in batch with `balanceOfBatch` (controlling that the batch size is not too big)
    await Promise.all(
        tokenHolders.map((tokenHolder) => {
            const ownerAddress = tokenHolder.signer?.evmAddress || tokenHolder.evmAddress!;
            if (!ownerAddress || ownerAddress === '' || ownerAddress === '0x') {
                tokenHolder.balance = BigInt('0');
                return Promise.resolve();
            }
            new erc1155.Contract(toChainContext(ctx), blockHeader, tokenHolder.token.id).balanceOf(ownerAddress, BigInt(tokenHolder.nftId!))
                .then((balance) => { tokenHolder.balance = BigInt(balance.toString()) });
        })
    );
}

// Queries storage and updates database once head block has been reached
export const updateFromHead = async (blockHeader: BlockHeader<Fields>) => {
    const BATCH_SIZE = process.env.BATCH_SIZE ? parseInt(process.env.BATCH_SIZE) : 100;
    const WAIT_TIME = process.env.WAIT_TIME ? parseInt(process.env.WAIT_TIME) : 0;

    ctx.log.info(`Updating accounts and token holders from head block ${blockHeader.height}`);

    // Fetch accounts from DB and update them in batches
    const accountsCount = (await ctx.store.count(Account)); // Skip the two util accounts
    ctx.log.info(`Total accounts: ${accountsCount - 2}`);
    for (let i = 2; i < accountsCount; i += BATCH_SIZE) {
        const accounts = await ctx.store.find(Account, { 
            skip: i, 
            take: BATCH_SIZE, 
            order: { timestamp: 'ASC' } 
        });
        ctx.log.info(`Updating accounts ${i - 2} to ${i - 2 + accounts.length}...`);
        await updateAccounts(accounts, blockHeader);
        await sleep(WAIT_TIME);
    }

    // We have to wait for accounts to be updated so that we can get the EVM addresses and updated REEF balances
    // Fetch native token holders from DB and update them in batches
    const nativeTokenHoldersCount = await ctx.store.count(TokenHolder, { 
        where: { token: { id: REEF_CONTRACT_ADDRESS } } 
    });
    ctx.log.info(`Total native token holders: ${nativeTokenHoldersCount}`);
    for (let i = 0; i < nativeTokenHoldersCount; i += BATCH_SIZE) {
        const nativeTokenHolders = await ctx.store.find(TokenHolder, {
            skip: i, 
            take: BATCH_SIZE,
            where: { token: { id: REEF_CONTRACT_ADDRESS } },
            relations: { token: true, signer: true }
        });
        ctx.log.info(`Updating native token holders ${i} to ${i + nativeTokenHolders.length}...`);
        await updateNativeTokenHolders(nativeTokenHolders);
        await sleep(WAIT_TIME);
    }

    // Fetch ERC20 token holders from DB and update them in batches
    const erc20TokenHoldersCount = await ctx.store.count(TokenHolder, {
        where: { token: { type: ContractType.ERC20, id: Not(REEF_CONTRACT_ADDRESS) } }
    });
    ctx.log.info(`Total ERC20 token holders: ${erc20TokenHoldersCount}`);
    for (let i = 0; i < erc20TokenHoldersCount; i += BATCH_SIZE) {
        const erc20TokenHolders = await ctx.store.find(TokenHolder, {
            skip: i, 
            take: BATCH_SIZE,
            where: { token: { type: ContractType.ERC20, id: Not(REEF_CONTRACT_ADDRESS) } },
            relations: { token: true, signer: true } 
        });
        ctx.log.info(`Updating ERC20 token holders ${i} to ${i + erc20TokenHolders.length}...`);
        await updateErc20TokenHolders(erc20TokenHolders, blockHeader);
        await sleep(WAIT_TIME);
    }

    // Fetch ERC721 token holders from DB and update them in batches
    const erc721TokenHoldersCount = await ctx.store.count(TokenHolder, {
        where: { token: { type: ContractType.ERC721 } }
    });
    ctx.log.info(`Total ERC721 token holders: ${erc721TokenHoldersCount}`);
    for (let i = 0; i < erc721TokenHoldersCount; i += BATCH_SIZE) {
        const erc721TokenHolders = await ctx.store.find(TokenHolder, {
            skip: i,
            take: BATCH_SIZE,
            where: { token: { type: ContractType.ERC721 } },
            relations: { token: true, signer: true }
        });
        ctx.log.info(`Updating ERC721 token holders ${i} to ${i + erc721TokenHolders.length}...`);
        await updateErc721TokenHolders(erc721TokenHolders, blockHeader);
        await sleep(WAIT_TIME);
    }

    // Fetch ERC1155 token holders from DB and update them in batches
    const erc1155TokenHoldersCount = await ctx.store.count(TokenHolder, {
        where: { token: { type: ContractType.ERC1155 } }
    });
    ctx.log.info(`Total ERC1155 token holders: ${erc1155TokenHoldersCount}`);
    for (let i = 0; i < erc1155TokenHoldersCount; i += BATCH_SIZE) {
        const erc1155TokenHolders = await ctx.store.find(TokenHolder, {
            skip: i,
            take: BATCH_SIZE,
            where: { token: { type: ContractType.ERC1155 } },
            relations: { token: true, signer: true }
        });
        ctx.log.info(`Updating ERC1155 token holders ${i} to ${i + erc1155TokenHolders.length}...`);
        await updateErc1155TokenHolders(erc1155TokenHolders, blockHeader);
        await sleep(WAIT_TIME);
    }
}
