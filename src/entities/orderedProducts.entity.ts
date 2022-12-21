import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {Order} from "./order.entity";

@Entity()
export class OrderedProducts {
    @PrimaryColumn()
    productId: number;

    @Column()
    amount: number;

    @ManyToOne(() => Order, (order) => order.id)
    order: string;
}
