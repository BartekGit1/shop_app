import { Field, ObjectType } from 'type-graphql/dist/decorators'
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne, OneToMany, OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {isNotEmpty, IsNotEmpty} from "class-validator";
import {type} from "os";
import {Product} from "./category.entity";
import {catchError} from "rxjs";

@Entity()
export class Opinion
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



    //
    // @ManyToOne(()=>Category)
    // @JoinColumn({name:"categoryTitle"})
    // category:Product;

    @PrimaryColumn()
    productId:string;

    @ManyToOne(()=>Product, (product)=>product.opinions)
    product:Product;



}

