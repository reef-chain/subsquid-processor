import { BlockHeader, Event } from "@subsquid/substrate-processor";
import { EraValidatorInfo, IndividualExposure } from "../model";
import { ctx, Fields } from "../processor";
import { staking } from "../types/storage";

export class StakingElectionManager {  
    eraValidatorInfos: EraValidatorInfo[] = [];
  
    async process(event: Event<Fields>) {
        const currentEra = await this.getCurrentEra(event.block);
        if (!currentEra) return;

        const erasStakersClipped = await this.getStakingErasStakersClipped(event.block, currentEra);
        if (!erasStakersClipped) return;

        erasStakersClipped.forEach(async ([[, address], exposure]) => {
            if (!exposure) return;
            const { others: othersTemp, own, total } = exposure;

            const others = othersTemp.map(({ value, who }) => new IndividualExposure({
              who: who,
              value: value.toString()
            }))
        
            const eraValidator = new EraValidatorInfo({
              id: `${event.id}-${address}`,
              address,
              era: currentEra,
              own,
              total,
              others,
              othersWho: others.map(({ who }) => who).join(' ')
            })
        
            this.eraValidatorInfos.push(eraValidator);
          })
    }
  
    async save() {   
        await ctx.store.save(this.eraValidatorInfos);
    }

    private async getCurrentEra(blockHeader: BlockHeader<Fields>) {
        const storageCurrentEraV5 = staking.currentEra.v5;
        if (!storageCurrentEraV5.is(blockHeader)) return undefined;

        return await storageCurrentEraV5.get(blockHeader);
    }

    private async getStakingErasStakersClipped(blockHeader: BlockHeader<Fields>, currentEra: number) {
        const storageErasStakersClippedV5 = staking.erasStakersClipped.v5;
        if (!storageErasStakersClippedV5.is(blockHeader)) return undefined;

        return await storageErasStakersClippedV5.getPairs(blockHeader, currentEra);
    }
}

  