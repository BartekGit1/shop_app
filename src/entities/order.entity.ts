import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

import {OrderedProduct} from "./orderedProducts.entity";
import {OrderState} from "./orderState.entity";

export enum ORDER_STATUS {
    NOT_CONFIRMED = 'not confirmed',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
}
@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    // orderDate: Date;
    orderDate: String;

    @Column()
    userName: String;

    @Column()
    email: String;

    @Column()
    phoneNumber: String;

    @Column({
        // unique: true,
        type: 'enum',
        enum: ORDER_STATUS,
        default: ORDER_STATUS.NOT_CONFIRMED,
    })
    orderStatus: string

    @OneToMany(() => OrderedProduct, (orderedProduct) => orderedProduct.order)
    orderedProducts: OrderedProduct[];
    // @OneToMany(() => OrderedProduct, (orderedProduct) => orderedProduct.order)
    // orderedProducts: OrderedProduct[];

}



// import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
//
// import {OrderedProduct} from "./orderedProducts.entity";
//
// @Entity()
// export class Order {
//     @PrimaryGeneratedColumn('uuid')
//     id: string;
//
//     @Column()
//         // orderDate: Date;
//     orderDate: String;
//
//     @Column()
//     userName: String;
//
//     @Column()
//     email: String;
//
//     @Column()
//     phoneNumber: String;
//
//
//     // @ManyToOne(() => OrderState)
//     // status: OrderState;
//
//     @OneToMany(() => OrderedProduct, (orderedProducts) => orderedProducts.order)
//     orderedProducts: OrderedProduct[];
//     //
//     // @OneToMany(() => OrderedProduct, (orderedProducts) => orderedProducts.orders)
//     // idOrder: OrderedProduct[];
// }
