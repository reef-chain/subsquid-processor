import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
} from "@subsquid/substrate-processor";
import { EventRaw } from "./interfaces/interfaces";
import { AccountManager } from "./process/accountManager";
import { BlockManager } from "./process/blockManager";
import { ExtrinsicManager } from "./process/extrinsicManager";
import { EventManager } from "./process/eventManager";
import { ContractManager } from "./process/contractManager";
import { EvmEventManager } from "./process/evmEventManager";
import { TransferManager } from "./process/transferManager";
import { TokenHolderManager } from "./process/tokenHolderManager";
import { StakingManager } from "./process/stakingManager";
import { hexToNativeAddress, REEF_CONTRACT_ADDRESS } from "./util/util";
import { lookupArchive } from "@subsquid/archive-registry";
import { VerifiedContract } from "./model";
import { SystemAccountStorage } from "./types/storage";

const RPC_URL = "wss://rpc.reefscan.com/ws";
// const RPC_URL = "ws://2coge6brv983789i7nh1aafkp4.ingress.bdl.computer:9944";

const ARCHIVE = lookupArchive('reef', {release: "FireSquid"}); // Aquarium archive
// const ARCHIVE = "http://localhost:8888/graphql"; // Local archive

const database = new TypeormDatabase();
const processor = new SubstrateBatchProcessor()
  .setBlockRange({ from: 0 })
  .setDataSource({ chain: RPC_URL, archive: ARCHIVE })
    .setTypesBundle('typesBundle.json')
  .addEvent("*")
  .includeAllBlocks(); // Force the processor to fetch the header data for all the blocks (by default, the processor fetches the block data only for all blocks that contain log items it was subscribed to)

export type Item = BatchProcessorItem<typeof processor>;
export type Context = BatchContext<Store, Item>;

export let reefVerifiedContract: VerifiedContract;
export let ctx: Context;

processor.run(database, async (ctx_) => {
  ctx = ctx_;

  const reefVerifiedContract_ = await ctx.store.get(VerifiedContract, REEF_CONTRACT_ADDRESS);
  if (reefVerifiedContract_) {
    reefVerifiedContract = reefVerifiedContract_;
  } else {
    throw new Error('REEF verified contract not found in the database');
  }

  const blockManager: BlockManager = new BlockManager();
  const extrinsicManager: ExtrinsicManager = new ExtrinsicManager();
  const eventManager: EventManager = new EventManager();
  const contractManager: ContractManager = new ContractManager();
  const evmEventManager: EvmEventManager = new EvmEventManager();
  const tokenHolderManager: TokenHolderManager = new TokenHolderManager();
  const stakingManager: StakingManager = new StakingManager();
  const transferManager: TransferManager = new TransferManager(tokenHolderManager);
  const accountManager = new AccountManager(tokenHolderManager);

  for (const block of ctx.blocks) {

    // TODO remove this debug block
    const storage = new SystemAccountStorage(ctx, block.header);
    const pairs = await storage.asV5.getPairs();
    //////////////////////////////////////

    blockManager.process(block.header);

    console.log(`Processing block ${block.header.height}`);
    for (const item of block.items) {
      if (item.kind === "event" && item.event.phase === "ApplyExtrinsic") {
        const eventRaw = item.event as EventRaw;

        extrinsicManager.process(eventRaw.extrinsic, block.header);
        eventManager.process(eventRaw, block.header);

        switch (item.name as string) {
          case 'EVM.Log':
            await evmEventManager.process(eventRaw, block.header, transferManager, accountManager, ctx.store);
            break;
          case 'EVM.Created':
            contractManager.process(eventRaw, block.header);
            break;
          case 'EVM.ExecutedFailed':
            await evmEventManager.process(eventRaw, block.header, transferManager, accountManager);
            break;

          case 'EvmAccounts.ClaimAccount':
            const addressClaimer = hexToNativeAddress(eventRaw.args[0]);
            await accountManager.process(addressClaimer, block.header);
            break;

          case 'Balances.Endowed':
            const addressEndowed = hexToNativeAddress(eventRaw.args[0]);
            await accountManager.process(addressEndowed, block.header);
            break;
          case 'Balances.Reserved':
            const addressReserved = hexToNativeAddress(eventRaw.args[0]);
            await accountManager.process(addressReserved, block.header);
            break;
          case 'Balances.Transfer':
            await transferManager.process(eventRaw, block.header, accountManager, reefVerifiedContract, true);
            break;

          case 'Staking.Rewarded':
            await stakingManager.process(eventRaw, block.header, accountManager);
            break;

          case 'System.KilledAccount':
            const address = hexToNativeAddress(eventRaw.args);
            await accountManager.process(address, block.header, false);
            break;
        }
      }
    }
  }

  console.log(`Saving blocks from ${ctx.blocks[0].header.height} to ${ctx.blocks[ctx.blocks.length - 1].header.height}`);

  const blocks = await blockManager.save();
  const extrinsics = await extrinsicManager.save(blocks);
  const events = await eventManager.save(blocks, extrinsics);
  const accounts = await accountManager.save(blocks);
  await contractManager.save(accounts, extrinsics);
  await evmEventManager.save(blocks, events);
  await transferManager.save(blocks, extrinsics, accounts);
  await tokenHolderManager.save(accounts);
  await stakingManager.save(accounts, events);
});
