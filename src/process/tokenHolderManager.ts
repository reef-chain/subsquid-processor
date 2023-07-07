import { TokenHolderData } from "../interfaces/interfaces";
import { Account, TokenHolder, TokenHolderType, VerifiedContract } from "../model";
import { ctx } from "../processor";

export class TokenHolderManager {  
    tokenHoldersData: Map<string, TokenHolderData> = new Map();
    // Keep track of updated EOA accounts to emit Pusher event
    updatedEoaAccounts: Map<string, string> = new Map();
  
    process(
        address: string, 
        evmAddress: string,
        balance: bigint,
        timestamp: number,
        token: VerifiedContract,
        nftId: number|null = null
    ) {
        const holderIsContract = address === '0x';
        if (!holderIsContract) {
            this.updatedEoaAccounts.set(address, evmAddress);
        }

        const tokenHolderData: TokenHolderData = {
            id: `${token.id}-${holderIsContract ? evmAddress : address}${nftId ? `-${nftId}` : ''}`,
            token: token,
            signerAddress: holderIsContract ? '' : address,
            evmAddress: holderIsContract ? evmAddress : '',
            nftId: nftId ? BigInt(nftId) : null,
            type: holderIsContract ? TokenHolderType.Contract : TokenHolderType.Account,
            balance: balance,
            timestamp: new Date(timestamp),
        };

        this.tokenHoldersData.set(tokenHolderData.id, tokenHolderData);
    }
  
    async save(accounts: Map<string, Account>) {
        const tokenHolders: TokenHolder[] = [];

        // TODO: process in parallel
        for (const tokenHolderData of this.tokenHoldersData.values()) {
            let signer = null;
            if (tokenHolderData.signerAddress) {
                // Search signer account in cached accounts
                signer = accounts.get(tokenHolderData.signerAddress);
                if (!signer) {
                    // If not found, query the database
                    signer = await ctx.store.get(Account, tokenHolderData.signerAddress);
                    if (!signer) {
                        ctx.log.error(`ERROR saving token holder: Account ${tokenHolderData.signerAddress} not found`);
                        continue;
                    }
                } else {
                    // We only want to keep accounts that are not already cached in `accounts`
                    this.updatedEoaAccounts.delete(tokenHolderData.signerAddress);
                }
            }
    
            tokenHolders.push(
                new TokenHolder({
                    ...tokenHolderData,
                    signer: signer
                })
            );
        };
    
        await ctx.store.save(tokenHolders);
    }
}

  