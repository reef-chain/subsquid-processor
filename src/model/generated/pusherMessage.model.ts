import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class PusherMessage {
    constructor(props?: Partial<PusherMessage>) {
        Object.assign(this, props)
    }

    /**
     * Block ID
     */
    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: false})
    data!: string
}
