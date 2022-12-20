import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {isNotEmpty, IsNotEmpty} from "class-validator";
import {type} from "os";
import {OrderState} from "./orderState.entity";
import {OrderedProducts} from "./orderedProducts.entity";
import {Field} from "type-graphql/dist/decorators";

@Entity()
export class Order
{
    @PrimaryColumn()
    id:number;

    @Column()
    orderDate:Date;

    @Column()
    userName:String;

    @Column()
    email:String;

    @Column()
    phoneNumber:String;

    @ManyToOne(()=>OrderState)
    status:OrderState;

    @OneToMany(()=>OrderedProducts,(orderedProducts)=>orderedProducts.order)
    orderedProducts: OrderedProducts[];
}
