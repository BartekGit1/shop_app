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


export enum CATEGORIES {
    INGREDIENTS = 'ingredients', // eg. bat wings, herbs
    EQUIPMENT = 'equipment', // eg. broomsticks, wands
    CLOTHING = 'clothing', // eg. robes, gloves
    MATERIALS = 'materials', // eg. coal, wool
    COLLECTIBLES = 'collectibles', // eg. cards, coins
    PERISHABLE = 'perishable', // eg. ingredients, food
    NON_PERISHABLE = 'non-perishable', // eg. clothing, materials
}

@Entity()
export class Category
{
    // @PrimaryColumn()
    // title:string;

    @PrimaryColumn()
    title:string;


    // @OneToMany(() => Product, (product) => product.category)
    // products: Product;



    @OneToMany(()=>Product,(product)=>product.category)
    products:Product[];

}
