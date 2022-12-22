import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {Order} from "./order.entity";

@Entity()
export class OrderedProduct {
    @PrimaryColumn()
    id:string;
    @Column()
    order: string;

    @Column({type:'int'})
    amount: number;

    @ManyToOne(() => Order, (order) => order.idOrder)
    orders: Order;
}
