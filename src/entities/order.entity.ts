import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";

import {OrderedProduct} from "./orderedProducts.entity";
import {OrderState} from "./orderState.entity";

@Entity()
export class Order {
    @PrimaryColumn()
    id: string;

    @Column({nullable:true,
        type:"timestamptz"


    })
    orderDate: Date;

    @Column()
    userName: String;

    @Column()
    email: String;

    @Column()
    phoneNumber: String;

    // @Field(() => OrderState)
    @ManyToOne(() => OrderState)
    status: number;

    @OneToMany(() => OrderedProduct, (orderedProduct) => orderedProduct.order)
    orderedProducts: OrderedProduct[];

}

