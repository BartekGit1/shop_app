import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {Category} from "./category.entity";

@Entity()
export class Product {

    @PrimaryColumn({unique: true})
    id: string;

    @Column()
    title: string;
    @Column()
    description: string;

    @Column({type: 'decimal'})
    price: number;


    @Column({type: 'decimal'})
    weight: number;

    @Column()
    categoryTitle: string;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;


}

