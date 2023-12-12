import { BlockHeader } from "@subsquid/substrate-processor";
import { Fields } from "../../processor";
import { balances, system } from "../../types/storage";
import { AccountBalances, AccountBalancesBase, AccountBalancesLocked } from "./types";
import { AccountInfo, BalanceLock } from "../../types/v5";

const VESTING_ID = '0x76657374696e6720';

const getAccountBalancesBase = async (address: string, blockHeader: BlockHeader<Fields>): Promise<AccountBalancesBase> => {
    const storageV5 = system.account.v5
    if (storageV5.is(blockHeader)) {
        const accountInfo: AccountInfo | undefined = await storageV5.get(blockHeader, address);
        return {
            freeBalance: accountInfo ? BigInt(accountInfo.data.free) : BigInt(0),
            reservedBalance: accountInfo ? BigInt(accountInfo.data.reserved) : BigInt(0),
            votingBalance: accountInfo ? BigInt(accountInfo.data.free) : BigInt(0),
            accountNonce: accountInfo ? accountInfo.nonce : 0
        }
    }

    return {
        freeBalance: BigInt(0),
        reservedBalance: BigInt(0),
        votingBalance: BigInt(0),
        accountNonce: 0
    };
}

const getLockedData = async (address: string, blockHeader: BlockHeader<Fields>): Promise<AccountBalancesLocked> => {
    let lockedBalance = BigInt(0);
    let vestingLocked = BigInt(0);

    const storageV5 = balances.locks.v5;
    if (!storageV5.is(blockHeader)) {
        return { lockedBalance, vestingLocked };
    }

    const locks: BalanceLock[] | undefined = await storageV5.get(blockHeader, address);
    if (!locks) {
        return { lockedBalance, vestingLocked };
    }

    vestingLocked = locks.filter(({ id }) => id === VESTING_ID)
        .reduce((result: bigint, { amount }) => result += amount, BigInt(0));
    const vestingLocks: BalanceLock[] = locks.filter(({ id }) => id === VESTING_ID);
    vestingLocks.reduce((result: bigint, { amount }) => result += amount, BigInt(0));

    // get the maximum of the locks according to https://github.com/paritytech/substrate/blob/master/srml/balances/src/lib.rs#L699
    const notAll = locks.filter(({ amount }) => amount > BigInt(0));

    if (notAll.length) {
        lockedBalance = notAll.map(({ amount }) => amount).reduce((a, b) => BigInt(a) > BigInt(b) ? a : b);
    }

    return { lockedBalance, vestingLocked };
}

export const getBalancesAccount = async (blockHeader: BlockHeader<Fields>, address: string): Promise<AccountBalances> => {
    const [accountBalancesBase, accountBalancesLocked] = await Promise.all([
        getAccountBalancesBase(address, blockHeader),
        getLockedData(address, blockHeader)
    ]);

    return {
        availableBalance:
            accountBalancesLocked.lockedBalance >= accountBalancesBase.freeBalance 
                ? BigInt(0)
                : accountBalancesBase.freeBalance - accountBalancesLocked.lockedBalance,
        ...accountBalancesBase,
        ...accountBalancesLocked
    }
};