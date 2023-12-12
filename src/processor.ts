import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import { DataHandlerContext, SubstrateBatchProcessor } from "@subsquid/substrate-processor";
import { KnownArchives, lookupArchive } from "@subsquid/archive-registry";
import { MoreThanOrEqual, In } from "typeorm";
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
import { updateFromHead } from "./process/updateFromHead";
import { hexToNativeAddress, REEF_CONTRACT_ADDRESS } from "./util/util";
import { Account, Block, Event, EvmEvent, Extrinsic, Staking, Transfer, VerifiedContract } from "./model";
import { FirebaseDB } from "./firebase/firebase";

const network = process.env.NETWORK;
if (!network) {
  throw new Error('Network not set in environment.')
}

const RPC_URL = process.env[`NODE_RPC_WS_${network.toUpperCase()}`];
const AQUARIUM_ARCHIVE_NAME = process.env[`ARCHIVE_LOOKUP_NAME_${network.toUpperCase()}`] as KnownArchives;
console.log('\nNETWORK=',network, ' RPC=', RPC_URL, ' AQUARIUM_ARCHIVE_NAME=', AQUARIUM_ARCHIVE_NAME);
const ARCHIVE = lookupArchive(AQUARIUM_ARCHIVE_NAME, { release: 'ArrowSquid' });
const START_BLOCK = parseInt(process.env.START_BLOCK || '0');
export const REEFSWAP_ROUTER_ADDRESS = process.env[`REEFSWAP_ROUTER_ADDRESS_${network.toUpperCase()}`];

const database = new TypeormDatabase();
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
console.log(`Head reached: ${headReached}`);
console.log(`Pin to IPFS: ${pinToIPFSEnabled}`);

// Avoid type errors when serializing BigInts
(BigInt.prototype as any).toJSON = function () { return this.toString(); };

let isFirstBatch = true;
let newBlockData: NewBlockData;
let latestBlockHeight = 0;
let firstInvalidBlockHeight = 0;

const firebaseDB = process.env.NOTIFY_NEW_BLOCKS === 'true' ? new FirebaseDB() : null;
console.log(`Notify new blocks: ${!!firebaseDB}`);

processor.run(database, async (ctx_) => {
  ctx = ctx_;

  // Push data from previous batch
  if (firebaseDB && newBlockData) {
    firebaseDB.notifyBlock(newBlockData);
  }

  // Initialize global variables in first batch
  if (isFirstBatch) {
    const reefVerifiedContract_ = await ctx.store.get(VerifiedContract, REEF_CONTRACT_ADDRESS);
    if (reefVerifiedContract_) {
      reefVerifiedContract = reefVerifiedContract_;
    } else {
      throw new Error('REEF verified contract not found in the database');
    }

    const emptyAccount_ = await ctx.store.get(Account, "0x");
    if (emptyAccount_) {
      emptyAccount = emptyAccount_;
    } else {
      throw new Error('Empty account not found in the database');
    }

    const emptyExtrinsic_ = await ctx.store.get(Extrinsic, "-1");
    if (emptyExtrinsic_) {
      emptyExtrinsic = emptyExtrinsic_;
    } else {
      throw new Error('Empty extrinsic not found in the database');
    }

    isFirstBatch = false;
  }

  // Initialize managers
  const blockManager: BlockManager = new BlockManager();
  const extrinsicManager: ExtrinsicManager = new ExtrinsicManager();
  const eventManager: EventManager = new EventManager();
  const contractManager: ContractManager = new ContractManager();
  const evmEventManager: EvmEventManager = new EvmEventManager();
  const tokenHolderManager: TokenHolderManager = new TokenHolderManager();
  const stakingManager: StakingManager = new StakingManager();
  const transferManager: TransferManager = new TransferManager(tokenHolderManager);
  const accountManager = new AccountManager(tokenHolderManager, transferManager);

  // Process blocks
  for (const block of ctx.blocks) {
    if (block.header.height <= latestBlockHeight && firstInvalidBlockHeight !== 0) {
      // A previously unfinalized block was not valid. This block and all subsequent blocks have to be deleted from the database.
      firstInvalidBlockHeight = block.header.height;
    }

    if (!headReached && ctx.isHead) {
      headReached = true;
      await updateFromHead(block.header)
    }

    blockManager.process(block.header);

    ctx.log.debug(`Processing block ${block.header.height}`);

    for (const event of block.events) {
      if (event.phase === "ApplyExtrinsic") {
        const feeAmount = await extrinsicManager.process(event);
        eventManager.process(event);

        switch (event.name) {
          case 'EVM.Log':
            await evmEventManager.process(event, feeAmount, transferManager, accountManager, ctx.store);
            break;
          case 'EVM.Created':
            await contractManager.process(event);
            break;
          case 'EVM.ExecutedFailed':
            await evmEventManager.process(event, feeAmount, transferManager, accountManager);
            break;

          case 'EvmAccounts.ClaimAccount':
            const addressClaimer = hexToNativeAddress(event.args[0]);
            await accountManager.process(addressClaimer, block.header, true, true);
            break;

          case 'Balances.Endowed':
            const addressEndowed = hexToNativeAddress(event.args[0]);
            await accountManager.process(addressEndowed, block.header);
            break;
          case 'Balances.Reserved':
            const addressReserved = hexToNativeAddress(event.args[0]);
            await accountManager.process(addressReserved, block.header);
            break;
          case 'Balances.Transfer':
            await transferManager.process(event, accountManager, reefVerifiedContract, feeAmount, true);
            break;

          case 'Staking.Rewarded':
            await stakingManager.process(event, accountManager);
            break;

          case 'System.KilledAccount':
            const address = hexToNativeAddress(event.args);
            await accountManager.process(address, block.header, false);
            break;
        }
      }
    }
  }

  if (firstInvalidBlockHeight !== 0) {
    await deleteInvalidBlocks(firstInvalidBlockHeight);
    firstInvalidBlockHeight = 0;
  }

  // Save data to database
  ctx.log.info(`Saving blocks from ${ctx.blocks[0].header.height} to ${ctx.blocks[ctx.blocks.length - 1].header.height}`);
  const blocks = await blockManager.save();
  const extrinsics = await extrinsicManager.save(blocks);
  const events = await eventManager.save(blocks, extrinsics);
  const accounts = await accountManager.save(blocks);
  await contractManager.save(accounts, extrinsics);
  await evmEventManager.save(blocks, events);
  await transferManager.save(blocks, extrinsics, accounts, events);
  await tokenHolderManager.save(accounts);
  await stakingManager.save(accounts, events);
  latestBlockHeight = ctx.blocks[ctx.blocks.length - 1].header.height;

  // Update list of updated accounts for notification
  if (firebaseDB && headReached) {
    const lastBlockHeader = ctx.blocks[ctx.blocks.length - 1].header;
    
    const updatedErc20Accounts = Array.from(tokenHolderManager.tokenHoldersData.values())
      .filter(t => t.token.type === 'ERC20' && t.signerAddress !== '')
      .map(t => t.signerAddress as string)
      .filter((value, index, array) => array.indexOf(value) === index);
    const updatedErc721Accounts = Array.from(tokenHolderManager.tokenHoldersData.values())
      .filter(t => t.token.type === 'ERC721' && t.signerAddress !== '')
      .map(t => t.signerAddress as string)
      .filter((value, index, array) => array.indexOf(value) === index);
    const updatedErc1155Accounts = Array.from(tokenHolderManager.tokenHoldersData.values())
      .filter(t => t.token.type === 'ERC1155' && t.signerAddress !== '')
      .map(t => t.signerAddress as string)
      .filter((value, index, array) => array.indexOf(value) === index);

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
  
});

// Delete invalid blocks and associated data from the database
async function deleteInvalidBlocks(firstInvalidBlockHeight: number) {
  const eventsToDelete = await ctx.store.find(Event, { where: { block: { height: MoreThanOrEqual(firstInvalidBlockHeight) } } });
  const stakingToDelete = await ctx.store.find(Staking, { where: { event: In(eventsToDelete) } });
  const extrinsicsToDelete = await ctx.store.find(Extrinsic, { where: { block: { height: MoreThanOrEqual(firstInvalidBlockHeight) } } });
  const transfersToDelete = await ctx.store.find(Transfer, { where: { block: { height: MoreThanOrEqual(firstInvalidBlockHeight) } } });
  const evmEventsToDelete = await ctx.store.find(EvmEvent, { where: { block: { height: MoreThanOrEqual(firstInvalidBlockHeight) } } });
  const blocksToDelete = await ctx.store.find(Block, { where: { height: MoreThanOrEqual(firstInvalidBlockHeight) } });

  await ctx.store.remove(stakingToDelete);
  await ctx.store.remove(eventsToDelete);
  await ctx.store.remove(extrinsicsToDelete);
  await ctx.store.remove(transfersToDelete);
  await ctx.store.remove(evmEventsToDelete);
  await ctx.store.remove(blocksToDelete);
}