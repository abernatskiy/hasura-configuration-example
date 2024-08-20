import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToOne as OneToOne_, Index as Index_, JoinColumn as JoinColumn_} from "@subsquid/typeorm-store"
import {Burn} from "./burn.model"

@Entity_()
export class TxnWithBurn {
    constructor(props?: Partial<TxnWithBurn>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_({unique: true})
    @OneToOne_(() => Burn, {nullable: true})
    @JoinColumn_()
    burn!: Burn
}
