import {Entity, OneToMany, PrimaryColumn} from "typeorm";
import {Product} from "./product.entity";


@Entity()
export class Category {
    @PrimaryColumn()
    title: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];

}
