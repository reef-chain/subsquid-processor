import { BlockHeader, Event } from "@subsquid/substrate-processor";
import { AccountManager } from "./accountManager";
import { StakingData } from "../interfaces/interfaces";
import { Account, Event as EventModel, Staking, StakingType } from "../model";
import { ctx, Fields } from "../processor";
import { hexToNativeAddress } from "../util/util";
import { staking } from "../types/storage";
import * as ss58 from '@subsquid/ss58';

export class StakingManager {  
    stakingsData: StakingData[] = [];
    private rewardDestinationCache: Map<string, any> = new Map();

    async preloadRewardData(events: Event<Fields>[], blockHeader: BlockHeader<Fields>, accountManager: AccountManager): Promise<void> {
        const rewardEvents = events.filter(event => event.name === 'Staking.Rewarded');
        if (!rewardEvents.length) return;

        const signers = [...new Set(rewardEvents.map(event => hexToNativeAddress(event.args[0])))];
        await accountManager.preloadAddresses(signers, blockHeader);

        const storageV5 = staking.payee.v5;
        if (!storageV5.is(blockHeader)) return;

        const addressBytes = signers.map(address => ss58.decode(address).bytes);
        const rewardDestinations = await storageV5.getMany(blockHeader, addressBytes);
        const rewardAccounts: string[] = [];

        rewardDestinations.forEach((rewardDestination, index) => {
            const signerAddress = signers[index];
            this.rewardDestinationCache.set(this.getRewardDestinationCacheKey(blockHeader, signerAddress), rewardDestination);

            if (rewardDestination?.__kind === 'Account' && rewardDestination.value) {
                rewardAccounts.push(hexToNativeAddress(rewardDestination.value));
            }
        });

        if (rewardAccounts.length) {
            await accountManager.preloadAddresses(rewardAccounts, blockHeader);
        }
    }
  
    async process(event: Event<Fields>, accountManager: AccountManager) {
        let signerAddress = hexToNativeAddress(event.args[0]);
        const amount = event.args[1];
    
        await accountManager.process(signerAddress, event.block);
    
        const addressBytes = ss58.decode(signerAddress).bytes;
        const rewardDestination = await this.getStakingPayee(event.block, addressBytes);
        // If account has specified different reward destination we switch the staking signer to that one
        if (rewardDestination?.__kind === 'Account' && rewardDestination.value) {
            signerAddress = hexToNativeAddress(rewardDestination.value);
            await accountManager.process(signerAddress, event.block);
        }
    
        const stakingData = {
            id: event.id,
            signerAddress: signerAddress,
            type: StakingType.Reward,
            amount: amount,
            timestamp: new Date(event.block.timestamp!)
        };

        this.stakingsData.push(stakingData);
    }
  
    async save(accounts: Map<string, Account>, events: Map<string, EventModel>) {
        const stakings: Staking[] = [];

        // TODO: process in parallel
        for (const stakingData of this.stakingsData) {
            // Search signer account in cached accounts
            let signer = accounts.get(stakingData.signerAddress);
            if (!signer) {
                // If not found, query the database
                signer = await ctx.store.get(Account, stakingData.signerAddress);
                if (!signer) {
                    ctx.log.error(`ERROR saving staking: Account ${stakingData.signerAddress} not found`);
                    continue;
                }
            }
    
            const event = events.get(stakingData.id);
            if (!event) {
                ctx.log.error(`ERROR saving staking: Event ${stakingData.id} not found`);
                continue;
            }
            
            stakings.push(new Staking ({
                ...stakingData,
                signer: signer,
                event: event
            }));
        };
    
        await ctx.store.save(stakings);
    }

    private async getStakingPayee(blockHeader: BlockHeader<Fields>, address: string) {
        const cacheKey = this.getRewardDestinationCacheKey(blockHeader, address);
        if (this.rewardDestinationCache.has(cacheKey)) {
            return this.rewardDestinationCache.get(cacheKey);
        }

        const storageV5 = staking.payee.v5;
        if (storageV5.is(blockHeader)) {
            const rewardDestination = await storageV5.get(blockHeader, address);
            this.rewardDestinationCache.set(cacheKey, rewardDestination);
            return rewardDestination;
        }

        return undefined;
    }

    private getRewardDestinationCacheKey(blockHeader: BlockHeader<Fields>, address: string): string {
        return `${blockHeader.hash}:${address}`;
    }
}

  
