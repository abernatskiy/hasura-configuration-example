import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, StringColumn as StringColumn_, Index as Index_, BigIntColumn as BigIntColumn_, ManyToOne as ManyToOne_, OneToOne as OneToOne_} from "@subsquid/typeorm-store"
import {Account} from "./account.model"
import {TxnWithBurn} from "./txnWithBurn.model"

@Entity_()
export class Burn {
    constructor(props?: Partial<Burn>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @IntColumn_({nullable: false})
    block!: number

    @Index_()
    @StringColumn_({nullable: false})
    address!: string

    @BigIntColumn_({nullable: false})
    value!: bigint

    @StringColumn_({nullable: false})
    txHash!: string

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    account!: Account

    @OneToOne_(() => TxnWithBurn, e => e.burn)
    txn!: TxnWithBurn | undefined | null
}
