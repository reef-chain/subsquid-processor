import { BigInteger, Int } from '@subsquid/graphql-server';
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { EntityManager, In } from 'typeorm'
import { Account, TokenHolder, TokenHolderType, VerifiedContract } from '../../model';
import { NewBlockData } from "../../interfaces/interfaces";
import { FirebaseDB } from '../../firebase/firebase';

const firebaseDB = process.env.NOTIFY_NEW_BLOCKS === 'true' ? new FirebaseDB() : null;

@InputType()
export class TokenHolderInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true, defaultValue: '' })
  evmAddress!: string;

  @Field(() => BigInteger, { nullable: true })
  nftId!: bigint;

  @Field(() => String, { nullable: false })
  type!: string;

  @Field(() => BigInteger, { nullable: false })
  balance!: bigint;

  @Field(() => String, { nullable: false })
  tokenId!: string;

  @Field(() => String, { nullable: true })
  signerId!: string;

  @Field(() => BigInteger, { nullable: false })
  timestamp!: bigint;

  constructor(props: Partial<TokenHolderInput>) {
    Object.assign(this, props);
  }
}

@ObjectType()
export class TokenHolderCount {
  @Field(() => Int, { nullable: false })
  count!: number;

  constructor(props: Partial<TokenHolderCount>) {
    Object.assign(this, props);
  }
}

@Resolver()
export class TokenHolderResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Mutation(() => Boolean) async saveTokenHolders(
    @Arg('tokenHolders', () => [TokenHolderInput]) tokenHolders: TokenHolderInput[],
  ): Promise<Boolean> {
    const manager = await this.tx();

    const tokenIds = tokenHolders.map((tokenHolder) => tokenHolder.tokenId)
      .filter((id, index, self) => id && self.indexOf(id) === index);
    const tokens: VerifiedContract[] = await manager.findBy(VerifiedContract, { id: In(tokenIds) });

    const signerIds = tokenHolders.map((tokenHolder) => tokenHolder.signerId)
      .filter((id, index, self) => id && self.indexOf(id) === index);
    const signers: Account[] = await manager.findBy(Account, { id: In(signerIds) });
    
    const entities: TokenHolder[] = tokenHolders.map((tokenHolder) => {
      const token = tokens.find((t) => t.id === tokenHolder.tokenId);
      if (!token) throw new Error(`Token ${tokenHolder.tokenId} not found`);
  
      let signer: Account | undefined = undefined;
      if (tokenHolder.signerId) {
        signer = signers.find((s) => s.id === tokenHolder.signerId);
      }
  
      return new TokenHolder({
        id: tokenHolder.id,
        evmAddress: tokenHolder.evmAddress,
        nftId: tokenHolder.nftId,
        type: tokenHolder.type as TokenHolderType,
        balance: tokenHolder.balance,
        token,
        signer,
        timestamp: new Date(Number(tokenHolder.timestamp))
      });
    });

    await manager.save(entities);

    if (firebaseDB) {
      const updatedErc20Accounts = entities
        .filter(t => t.token.type === 'ERC20' && t.signer?.id !== '')
        .map(t => t.signer!.id as string)
        .filter((value, index, array) => array.indexOf(value) === index);
      const updatedErc721Accounts = entities
        .filter(t => t.token.type === 'ERC721' && t.signer?.id !== '')
        .map(t => t.signer!.id as string)
        .filter((value, index, array) => array.indexOf(value) === index);
      const updatedErc1155Accounts = entities
        .filter(t => t.token.type === 'ERC1155' && t.signer?.id !== '')
        .map(t => t.signer!.id as string)
        .filter((value, index, array) => array.indexOf(value) === index);
      
      if (!updatedErc20Accounts.length 
        && !updatedErc721Accounts.length 
        && !updatedErc1155Accounts.length
      ) {
        return true;
      }
      
      const data: NewBlockData = {
        blockHeight: -1,
        blockId: '',
        blockHash: '',
        updatedAccounts: {
            REEF20Transfers: updatedErc20Accounts,
            REEF721Transfers: updatedErc721Accounts,
            REEF1155Transfers: updatedErc1155Accounts,
            boundEvm: []
        },
        updatedContracts: [],
      };

      firebaseDB.notifyBlock(data);
    }

    return true;
  }

  @Query(() => TokenHolderCount)
  async tokenHoldersCount(@Arg('tokenId') tokenId: string): Promise<TokenHolderCount> {
    const manager = await this.tx();
    const repository = manager.getRepository(TokenHolderCount);
    const query = `
      SELECT COUNT(*)
      FROM token_holder th
      WHERE th.token_id = $1 AND th.balance > 0;
    `;
    const result = await repository.query(query, [tokenId]);
    return result[0];
  }
}
