import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./order.entity";
import {IsNotEmpty} from "class-validator";

@Entity()
export class OrderedProduct {

    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column({type: 'int'})
    amountOfOrderedProducts!: number

    @Column()
    orderedProducts: string


    @ManyToOne(() => Order, (order) => order.orderedProducts)
    @IsNotEmpty()
    order: String;
}
