import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import { Block, DataHandlerContext, SubstrateBatchProcessor } from "@subsquid/substrate-processor";
import { KnownArchives, lookupArchive } from "@subsquid/archive-registry";
import { NewBlockData } from "./interfaces/interfaces";
import { AccountManager } from "./process/accountManager";
import { BlockManager } from "./process/blockManager";
import { ExtrinsicManager } from "./process/extrinsicManager";
import { EventManager } from "./process/eventManager";
import { ContractManager } from "./process/contractManager";
import { EvmEventManager } from "./process/evmEventManager";
import { TransferManager } from "./process/transferManager";
import { TokenHolderManager } from "./process/tokenHolderManager";
import { StakingManager } from "./process/stakingManager";
import { StakingElectionManager } from "./process/stakingElectionManager";
import { updateFromHead } from "./process/updateFromHead";
import { hexToNativeAddress, REEF_CONTRACT_ADDRESS } from "./util/util";
import { Account, Extrinsic, VerifiedContract } from "./model";
import { FirebaseDB } from "./emitter/firebase";
import { Pusher } from "./emitter/pusher";
import { EmitterIO } from "./emitter/emitter-io";

const network = process.env.NETWORK;
if (!network) {
  throw new Error('Network not set in environment.')
}

const RPC_URL = process.env[`NODE_RPC_WS_${network.toUpperCase()}`];
const AQUARIUM_ARCHIVE_NAME = process.env[`ARCHIVE_LOOKUP_NAME_${network.toUpperCase()}`] as KnownArchives;
const USE_ONLY_RPC = process.env.USE_ONLY_RPC === 'true';
export const SUPPORT_HOT_BLOCKS = process.env.SUPPORT_HOT_BLOCKS === 'true';
const ARCHIVE = USE_ONLY_RPC ? undefined : lookupArchive(AQUARIUM_ARCHIVE_NAME, { release: 'ArrowSquid' });
const START_BLOCK = parseInt(process.env.START_BLOCK || '0');
export const REEFSWAP_ROUTER_ADDRESS = process.env[`REEFSWAP_ROUTER_ADDRESS_${network.toUpperCase()}`];
const BATCH_SIZE = parseInt(process.env.PROCESSOR_BATCH_SIZE || '1000');
console.log(`
    Network: ${network}
    RPC URL: ${RPC_URL}
    Reefswap Router: ${REEFSWAP_ROUTER_ADDRESS}
    Archive: ${USE_ONLY_RPC ? 'None' : ARCHIVE}
    Support hot blocks: ${SUPPORT_HOT_BLOCKS}
    Start block: ${START_BLOCK}
    Batch size: ${BATCH_SIZE}
`);

const database = new TypeormDatabase({supportHotBlocks: SUPPORT_HOT_BLOCKS});
const fields = {
  event: {
    phase: true,
  },
  extrinsic: {
    signature: true,
    success: true,
    error: true,
    hash: true,
    version: true,
  },
  call: {
    name: true,
    args: true,
  },
  block: {
    timestamp: true,
    stateRoot: true,
    extrinsicsRoot: true,
    validator: true,
  }
};
export type Fields = typeof fields;

const processor = new SubstrateBatchProcessor()
  .setBlockRange({ from: START_BLOCK })
  .setDataSource({ chain: { url: RPC_URL!, rateLimit: 10 }, archive: ARCHIVE })
  .addEvent({ call: true, extrinsic: true })
  .addCall({})
  .includeAllBlocks()
  .setFields(fields);

export let reefVerifiedContract: VerifiedContract;
export let emptyAccount: Account;
export let emptyExtrinsic: Extrinsic;
export let ctx: DataHandlerContext<Store, Fields>;
export let headReached = process.env.HEAD_REACHED === 'true'; // default to false
export const pinToIPFSEnabled = process.env.PIN_TO_IPFS !== 'false'; // default to true
console.log(`    Head reached: ${headReached}`);
console.log(`    Pin to IPFS: ${pinToIPFSEnabled}`);

// Avoid type errors when serializing BigInts
(BigInt.prototype as any).toJSON = function () { return this.toString(); };

let isFirstBatch = true;
let newBlockData: NewBlockData;

const firebaseDB = process.env.FIREBASE_EMITTER_ENABLED === 'true' ? new FirebaseDB() : null;
console.log(`    FirebaseDB emitter enabled: ${!!firebaseDB}`);

const emitterIO = process.env.EMITTER_IO_ENABLED === 'true' ? new EmitterIO() : null;
console.log(`    EmitterIO emitter enabled: ${!!emitterIO}`);

const pusher = process.env.PUSHER_ENABLED === 'true' ? new Pusher() : null;
console.log(`    Pusher enabled: ${!!pusher}`);

processor.run(database, async (ctx_) => {
  ctx = ctx_;
  for (let i = 0; i < ctx.blocks.length; i += BATCH_SIZE) {
    const batch =  ctx.blocks.slice(i, i + BATCH_SIZE);
    await processBatch(batch);
  }
});

const processBatch = async (batch: Block<Fields>[]) => {
  console.log("[processBatch] function called") //remove-this-later
  // Push data from previous batch
  if (newBlockData) {
    console.log("new block detected") //remove-this-later
    if (firebaseDB) firebaseDB.notifyBlock(newBlockData);
    if (emitterIO) emitterIO.notifyBlock(newBlockData);
    if (pusher) pusher.notifyBlock(newBlockData);
    console.log("emitted the new block") //remove-this-later
  }

  // Initialize global variables in first batch
  if (isFirstBatch) {
    console.log("is this the first batch?") //remove-this-later
    const reefVerifiedContract_ = await ctx.store.get(VerifiedContract, REEF_CONTRACT_ADDRESS);
    console.log("reef verified contract instance fetched") //remove-this-later
    if (reefVerifiedContract_) {
      console.log("is reef verified contract") //remove-this-later
      reefVerifiedContract = reefVerifiedContract_;
    } else {
      console.log("no reef verified contract in db") //remove-this-later
      throw new Error('REEF verified contract not found in the database');
    }

    const emptyAccount_ = await ctx.store.get(Account, "0x");
    console.log("get empty account instance") //remove-this-later
    if (emptyAccount_) {
      emptyAccount = emptyAccount_;
    } else {
      console.log("empty account not found") //remove-this-later
      throw new Error('Empty account not found in the database');
    }

    const emptyExtrinsic_ = await ctx.store.get(Extrinsic, "-1");
    console.log("get empty extrinsic") //remove-this-later
    if (emptyExtrinsic_) {
      emptyExtrinsic = emptyExtrinsic_;
    } else {
      console.log("empty extrinsic not found") //remove-this-later
      throw new Error('Empty extrinsic not found in the database');
    }


    isFirstBatch = false;
  }

  // Initialize managers
  const blockManager: BlockManager = new BlockManager();
  console.log("1/10 block manager init") //remove-this-later
  const extrinsicManager: ExtrinsicManager = new ExtrinsicManager();
  console.log("2/10 extrinsic manager init") //remove-this-later
  const eventManager: EventManager = new EventManager();
  console.log("3/10 event manager init") //remove-this-later
  const contractManager: ContractManager = new ContractManager();
  console.log("4/10 contract manager init") //remove-this-later
  const evmEventManager: EvmEventManager = new EvmEventManager();
  console.log("5/10 evm event manager init") //remove-this-later
  const tokenHolderManager: TokenHolderManager = new TokenHolderManager();
  console.log("6/10 token holder manager init") //remove-this-later
  const stakingManager: StakingManager = new StakingManager();
  console.log("7/10 staking manager init") //remove-this-later
  const stakingElectionManager: StakingElectionManager = new StakingElectionManager();
  console.log("8/10 staking election manager init") //remove-this-later
  const transferManager: TransferManager = new TransferManager(tokenHolderManager);
  console.log("9/10 transfer manager init") //remove-this-later
  const accountManager = new AccountManager(tokenHolderManager, transferManager);
  console.log("10/10 account manager init") //remove-this-later

  if (batch.length > 1) ctx.log.debug(`Batch size: ${batch.length}`);
  console.log("batch size ",batch.length) //remove-this-later

  // Process blocks
  for (const block of batch) {
    console.log("block processing started") //remove-this-later
    if (!headReached && ctx.blocks[0].header.height > 1 && ctx.isHead 
        && block.header.height === ctx.blocks[ctx.blocks.length - 1].header.height) {
      headReached = true;
      await updateFromHead(block.header);
    }

    console.log("processing block") //remove-this-later
    blockManager.process(block.header);
    console.log("processed block") //remove-this-later

    ctx.log.debug(`Processing block ${block.header.height}`);

    for (const event of block.events) {
      if (event.phase === "Initialization" && 
          (event.name === 'Staking.StakingElection' || event.name === 'Staking.StakersElected') ) {
            console.log("staking process start") //remove-this-later
            await stakingElectionManager.process(event);
            console.log("staking process end") //remove-this-later
      } else if (event.phase === "ApplyExtrinsic") {
        const signedData = await extrinsicManager.process(event);
        eventManager.process(event);
        console.log("end") //remove-this-later

        switch (event.name) {
          case 'EVM.Log':
            console.log("evm.log process start") //remove-this-later
            await evmEventManager.process(event, signedData, transferManager, accountManager, ctx.store);
            console.log("end") //remove-this-later
            break;
          case 'EVM.Created':
            console.log("evm.created process start") //remove-this-later
            await contractManager.process(event);
            console.log("end") //remove-this-later
            break;
          case 'EVM.ExecutedFailed':
            console.log("evm.executedfailed process start") //remove-this-later
            await evmEventManager.process(event, signedData, transferManager, accountManager);
            console.log("end") //remove-this-later
            break;

          case 'EvmAccounts.ClaimAccount':
            console.log("evmaccounts.claimaccount process start") //remove-this-later
            const addressClaimer = hexToNativeAddress(event.args[0]);
            await accountManager.process(addressClaimer, block.header, true, true);
            console.log("end") //remove-this-later
            break;

          case 'Balances.Endowed':
            console.log("balances.endowed process start") //remove-this-later
            const addressEndowed = hexToNativeAddress(event.args[0]);
            await accountManager.process(addressEndowed, block.header);
            console.log("end") //remove-this-later
            break;
          case 'Balances.Reserved':
            console.log("balances process start") //remove-this-later
            const addressReserved = hexToNativeAddress(event.args[0]);
            await accountManager.process(addressReserved, block.header);
            console.log("end") //remove-this-later
            break;
          case 'Balances.Transfer':
            console.log("balances transfer process start") //remove-this-later
            await transferManager.process(event, accountManager, reefVerifiedContract, signedData, true);
            console.log("end") //remove-this-later
            break;

          case 'Staking.Rewarded':
            console.log("staking process start") //remove-this-later
            await stakingManager.process(event, accountManager);
            console.log("end") //remove-this-later
            break;

          case 'System.KilledAccount':
            console.log("system.killedAccount process start") //remove-this-later
            const address = hexToNativeAddress(event.args);
            await accountManager.process(address, block.header, false);
            console.log("end") //remove-this-later
            break;
        }
      }
    }
  }

  // Save data to database
  ctx.log.info(`Saving blocks from ${batch[0].header.height} to ${batch[batch.length - 1].header.height}`);
  const blocks = await blockManager.save();
  const extrinsics = await extrinsicManager.save(blocks);
  const events = await eventManager.save(blocks, extrinsics);
  const accounts = await accountManager.save(blocks);
  await contractManager.save(accounts, extrinsics);
  await evmEventManager.save();
  await transferManager.save(accounts);
  await tokenHolderManager.save(accounts);
  await stakingManager.save(accounts, events);
  await stakingElectionManager.save();

  // Update list of updated accounts for notification
  if ((firebaseDB || emitterIO || pusher) && headReached) {
    const lastBlockHeader = batch[batch.length - 1].header;
    
    const updatedErc20Accounts = Array.from(tokenHolderManager.tokenHoldersData.values())
      .filter(t => t.token.type === 'ERC20' && t.signerAddress !== '')
      .map(t => t.signerAddress as string)
      .filter((value, index, array) => array.indexOf(value) === index);
      console.log("updatedErc20Accounts parsed") //remove-this-later
    const updatedErc721Accounts = Array.from(tokenHolderManager.tokenHoldersData.values())
      .filter(t => t.token.type === 'ERC721' && t.signerAddress !== '')
      .map(t => t.signerAddress as string)
      .filter((value, index, array) => array.indexOf(value) === index);
      console.log("updatedErc721Accounts parsed") //remove-this-later
    const updatedErc1155Accounts = Array.from(tokenHolderManager.tokenHoldersData.values())
      .filter(t => t.token.type === 'ERC1155' && t.signerAddress !== '')
      .map(t => t.signerAddress as string)
      .filter((value, index, array) => array.indexOf(value) === index);
      console.log("updatedErc1155Accounts parsed") //remove-this-later

    newBlockData = {
      blockHeight: lastBlockHeader.height,
      blockId: lastBlockHeader.id,
      blockHash: lastBlockHeader.hash,
      updatedAccounts: {
        REEF20Transfers: updatedErc20Accounts,
        REEF721Transfers: updatedErc721Accounts,
        REEF1155Transfers: updatedErc1155Accounts,
        boundEvm: Array.from(accountManager.allClaimedEvmNativeAddresses),
      },
      updatedContracts: [...new Set(evmEventManager.evmEventsData.map(e => e.contractAddress))],
    };
  }
  
};