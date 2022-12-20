import {Column, Entity, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique} from "typeorm";
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
    @PrimaryColumn()
    title:string;


    // @ManyToMany(() => Product, (product) => product.categories)
    // products: Product[];
    @OneToMany(() => Product, (product) => product.category)
    products: Category[];

}
