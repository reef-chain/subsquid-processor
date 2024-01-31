import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {IndividualExposure} from "./_individualExposure"

@Entity_()
export class EraValidatorInfo {
    constructor(props?: Partial<EraValidatorInfo>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("text", {nullable: false})
    address!: string

    @Index_()
    @Column_("int4", {nullable: false})
    era!: number

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    total!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    own!: bigint

    @Column_("jsonb", {transformer: {to: obj => obj.map((val: any) => val == null ? undefined : val.toJSON()), from: obj => obj == null ? undefined : marshal.fromList(obj, val => val == null ? undefined : new IndividualExposure(undefined, val))}, nullable: false})
    others!: (IndividualExposure | undefined | null)[]

    @Column_("text", {nullable: false})
    othersWho!: string
}
