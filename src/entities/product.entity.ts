import { Field, ObjectType } from 'type-graphql/dist/decorators'
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {isNotEmpty, IsNotEmpty} from "class-validator";
import {type} from "os";
import {Category} from "./category.entity";
import {catchError} from "rxjs";

@Entity()
export class Product
{
    // @IsNotEmpty()
    @PrimaryColumn()
    id:string;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column({type:'decimal'})
    price:number;


    @Column({type:'decimal'})
    weight:number;

    // @PrimaryColumn()
    // categoryText:string;
    // @IsNotEmpty()
    // // @ManyToOne(()=>Category,(category)=>category.products)
    // @ManyToMany(()=>Category,(category)=>category.products)
    // @JoinTable()
    // categories:Category[];

    // @JoinColumn({name:"categoryTitle",referencedColumnName:"title"})
    // category:Category;


    @ManyToOne(title=>Category)
    @JoinColumn({name:"categoryTitle",referencedColumnName:"title"})
    category:Category;

}

