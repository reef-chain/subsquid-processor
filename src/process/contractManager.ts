import { Event } from "@subsquid/substrate-processor";
import { ContractData } from "../interfaces/interfaces";
import { Account, Contract, Extrinsic } from "../model";
import { ctx, Fields } from "../processor";
import { hexToNativeAddress, toChecksumAddress } from "../util/util";
import { DataRawAddress } from "../util/interfaces";

export class ContractManager {  
    contractsData: ContractData[] = [];
  
    async process(event: Event<Fields>) {
        if (event.call?.name !== 'EVM.create') return;

        const address = typeof event.args === 'string'
            ? toChecksumAddress(event.args) // v8
            : toChecksumAddress(event.args[1]); // v9

        if (this.contractsData.find(c => c.id === address)) return;
        const existingContract = await ctx.store.get(Contract, address);
        if (existingContract) return;

        const bytecode = event.call.args.init;
        const { context, args } = this.preprocessBytecode(bytecode);
        const addressHex = (event.extrinsic!.signature!.address as DataRawAddress).value;
        const signerAddress = hexToNativeAddress(addressHex);
    
        const contractData = {
            id: toChecksumAddress(address),
            extrinsicId: event.extrinsic!.id,
            signerAddress: signerAddress,
            bytecode: bytecode,
            bytecodeContext: context,
            bytecodeArguments: args,
            gasLimit: event.call!.args.gasLimit,
            storageLimit: event.call!.args.storageLimit,
            timestamp: new Date(event.block.timestamp!)
        };

        this.contractsData.push(contractData);
    }
  
    async save(accounts: Map<string, Account>, extrinsics: Map<string, Extrinsic>): Promise<void> {
        const contracts: Contract[] = [];

        // TODO: process in parallel
        for (const contractData of this.contractsData) {
            // Search signer account in cached accounts
            let signer = accounts.get(contractData.signerAddress);
            if (!signer) {
                // If not found, query the database
                signer = await ctx.store.get(Account, contractData.signerAddress);
                if (!signer) {
                    ctx.log.error(`ERROR saving contract: Account ${contractData.signerAddress} not found`);
                    continue
                }
            }
    
            const extrinsic = extrinsics.get(contractData.extrinsicId);
            if (!extrinsic) {
                ctx.log.error(`ERROR saving contract: Extrinsic ${contractData.extrinsicId} not found`);
                continue;
            }
            
            contracts.push(new Contract ({
                ...contractData,
                signer: signer,
                extrinsic: extrinsic
            }));
        };
    
        await ctx.store.insert(contracts);
    }

    private preprocessBytecode(bytecode: string) {
        const start = bytecode.indexOf('6080604052');
        const end = bytecode.indexOf('a265627a7a72315820') !== -1
            ? bytecode.indexOf('a265627a7a72315820')
            : bytecode.indexOf('a264697066735822');
        return {
            context: bytecode.slice(start, end),
            args: bytecode.slice(end),
        };
    }
}
