import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany, OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    Unique
} from "typeorm";
import {IsNotEmpty} from "class-validator";
import {Product} from "./product.entity";
import {Field} from "type-graphql/dist/decorators";



@Entity()
export class Category
{
    @PrimaryColumn()
    title:string;

    @OneToMany(()=>Product,(product)=>product.category)
    products:Product[];

}
