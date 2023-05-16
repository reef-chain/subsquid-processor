import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {VerifiedContract} from "./verifiedContract.model"
import {Account} from "./account.model"
import {TokenHolderType} from "./_tokenHolderType"

@Index_(["token", "signer", "nftId"], {unique: true})
@Entity_()
export class TokenHolder {
    constructor(props?: Partial<TokenHolder>) {
        Object.assign(this, props)
    }

    /**
     * <tokenAddress>-<signerAddress>-<nftId>
     */
    @PrimaryColumn_()
    id!: string

    @ManyToOne_(() => VerifiedContract, {nullable: true})
    token!: VerifiedContract

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    signer!: Account | undefined | null

    @Index_()
    @Column_("text", {nullable: true})
    evmAddress!: string | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    nftId!: bigint | undefined | null

    @Column_("varchar", {length: 8, nullable: false})
    type!: TokenHolderType

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    balance!: bigint

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date
}
