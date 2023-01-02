import {Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./order.entity";
import internal from "stream";
import {IsNotEmpty} from "class-validator";

@Entity()
export class OrderedProduct {
    // @PrimaryColumn()
    // id:string;
    // @Column()
    // order: string;
    //
    // @Column({type:'int'})
    // amount: number;
    //
    // @ManyToOne(() => Order, (order) => order.idOrder)
    // orders: Order;




    @PrimaryGeneratedColumn('uuid')
    id:string
    // @Column({ type: 'int',array:true })
    @Column({ type: 'int' })
    amountOfOrderedProducts!: number

    // @Column({array:true})
    @Column()
    // product_id!: number
    orderedProducts:string




    @ManyToOne(() => Order, (order) => order.orderedProducts)
    @IsNotEmpty()
    order: String;




    // @PrimaryGeneratedColumn('uuid')
    // id:string
    // @Column({ type: 'string',array:true })
    // orderedProducts:string[];
    //
    //
    // @Column("int",{array:true})
    //     // product_id!: number
    // amountOfOrderedProducts:number[];
    //
    // @ManyToOne(() => Order, (order) => order.id)
    // order!: string
}
