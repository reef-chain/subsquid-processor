import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import { DataHandlerContext, SubstrateBatchProcessor } from "@subsquid/substrate-processor";
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
import { updateFromHead } from "./process/updateFromHead";
import { hexToNativeAddress, REEF_CONTRACT_ADDRESS } from "./util/util";
import { Account, Extrinsic, VerifiedContract } from "./model";
import { FirebaseDB } from "./firebase/firebase";

// TODO: remove pusher
import Pusher from "pusher";
let pusher: Pusher;
const PUSHER_CHANNEL = process.env.PUSHER_CHANNEL;
const PUSHER_EVENT = process.env.PUSHER_EVENT;
if (process.env.PUSHER_ENABLED === 'true' && PUSHER_CHANNEL && PUSHER_EVENT) {
  pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.PUSHER_CLUSTER || "eu",
    useTLS: true
  });
  console.log('    Pusher enabled: true');
} else {
  console.log('    Pusher enabled: false');
}

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
console.log(`
    Network: ${network}
    RPC URL: ${RPC_URL}
    Reefswap Router: ${REEFSWAP_ROUTER_ADDRESS}
    Archive: ${USE_ONLY_RPC ? 'None' : ARCHIVE}
    Support hot blocks: ${SUPPORT_HOT_BLOCKS}
    Start block: ${START_BLOCK}
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

const firebaseDB = process.env.NOTIFY_NEW_BLOCKS === 'true' ? new FirebaseDB() : null;
console.log(`    Notify new blocks: ${!!firebaseDB}`);

processor.run(database, async (ctx_) => {
  ctx = ctx_;

  // Push data from previous batch
  if (firebaseDB && newBlockData) {
    firebaseDB.notifyBlock(newBlockData);
  }
  // TODO: remove pusher
  if (pusher && newBlockData) {
    pushMessage(newBlockData);
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

  if (ctx.blocks.length > 1) ctx.log.debug(`Batch size: ${ctx.blocks.length}`);

  // Process blocks
  for (const block of ctx.blocks) {
    if (!headReached && ctx.isHead) {
      headReached = true;
      await updateFromHead(block.header);
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

  // Save data to database
  ctx.log.info(`Saving blocks from ${ctx.blocks[0].header.height} to ${ctx.blocks[ctx.blocks.length - 1].header.height}`);
  const blocks = await blockManager.save();
  const extrinsics = await extrinsicManager.save(blocks);
  const events = await eventManager.save(blocks, extrinsics);
  const accounts = await accountManager.save(blocks);
  await contractManager.save(accounts, extrinsics);
  await evmEventManager.save();
  await transferManager.save(accounts);
  await tokenHolderManager.save(accounts);
  await stakingManager.save(accounts, events);

  // Update list of updated accounts for notification
  if ((firebaseDB || pusher) && headReached) {
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

// TODO: remove pusher
async function pushMessage(data: NewBlockData) {
  if (!data.updatedContracts.length 
    && !data.updatedAccounts.REEF20Transfers.length 
    && !data.updatedAccounts.REEF721Transfers.length 
    && !data.updatedAccounts.REEF1155Transfers.length 
    && !data.updatedAccounts.boundEvm.length
  ) {
    return;
  }

  try {
    await pusher.trigger(PUSHER_CHANNEL!, PUSHER_EVENT!, data);
  } catch (e) {
    ctx.log.error(`Pusher error: ${e}`);
  }
}
