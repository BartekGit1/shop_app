import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {OrderState} from "./orderState.entity";
import {OrderedProducts} from "./orderedProducts.entity";

@Entity()
export class Order {
    @PrimaryColumn()
    id: number;

    @Column()
    orderDate: Date;

    @Column()
    userName: String;

    @Column()
    email: String;

    @Column()
    phoneNumber: String;

    @ManyToOne(() => OrderState)
    status: OrderState;

    @OneToMany(() => OrderedProducts, (orderedProducts) => orderedProducts.order)
    orderedProducts: OrderedProducts[];
}
