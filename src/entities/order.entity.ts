import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";

import {OrderedProduct} from "./orderedProducts.entity";

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

    @Column()
    amount:String;

    @Column()
    order:String;
    // @ManyToOne(() => OrderState)
    // status: OrderState;

    @OneToMany(() => OrderedProduct, (orderedProducts) => orderedProducts.orders)
    idOrder: OrderedProduct[];
}
