import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "../entities/category.entity";
import {Repository} from "typeorm";

const categories=[  {category:"ksiazki"},{category:"plyty"},{category:"jedzenie"}];

@Injectable()
export class CategoryService{
 constructor(@InjectRepository(Product)private repo : Repository<Product>) {}
    async getAllCategories()
    {
        return this.repo.find();
    }



    addCategory(title: string)
    {
    // const newCategory=this.repo.create({title});
    // this.repo.save(newCategory);
    }

}