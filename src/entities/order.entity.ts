import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

import {OrderedProduct} from "./orderedProducts.entity";
import {OrderState} from "./orderState.entity";
import {Field} from "type-graphql/dist/decorators";

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    orderDate: Date;

    @Column()
    userName: String;

    @Column()
    email: String;

    @Column()
    phoneNumber: String;

    @Field(() => OrderState)
    @ManyToOne(() => OrderState)
    status: number;


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
