import { Field, ObjectType } from 'type-graphql/dist/decorators'
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne, OneToMany, OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn, Unique
} from "typeorm";
import {isNotEmpty, IsNotEmpty} from "class-validator";
import {type} from "os";
import {Category} from "./category.entity";
import {catchError} from "rxjs";

@Entity()
export class Product
{

    @PrimaryColumn({unique:true})
    id:string;

    @Column()
    title:string;
    @Column()
    description:string;

    @Column({type:'decimal'})
    price:number;


    @Column({type:'decimal'})
    weight:number;

    @PrimaryColumn()
    categoryTitle:string;

    @ManyToOne(()=>Category, (category)=>category.products)
    category:Category;



}

