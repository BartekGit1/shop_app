import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "../entities/product.entity";
import {Repository} from "typeorm";
import {addProductDto} from "./dto/add-product-dto";
import {updateProductInBodyDto} from "./dto/update-product-in-body-dto";
import {updateProductInLinkDto} from "./dto/update-product-dto";


@Injectable()
export class ProductsService{
    constructor(@InjectRepository(Product)private repo : Repository<Product>) {}
    getAll(){

        return this.repo.find();
    }
    getAllProductsById(id: string)
    {
        return( this.repo.findBy({id}));
    }

    async create(product: addProductDto)
    {
        // const id= Math.round(Math.random()*1000);
        // const newProduct = {id,title,price};
        // products.push(newProduct);
        // return newProduct;


    // product.categoryTitle="1";
    //     product.categoryTitle="narzedzia";
        console.log(product);
    //     const data=this.repo.create(product);
        // // console.log(product.categoryTitle);
        // return this.repo.save(data);
        const data=this.repo.create(product);
        return this.repo.save(data);
    }
   async updateWithLink(id:string,product:updateProductInLinkDto)
    {
        const productElement= await this.repo.findOneBy({id});
        productElement.price=product.price;
        productElement.title=product.title;
        // productElement.category=product.categoryTitle;
        productElement.weight=product.weight;
        productElement.description=product.description;
        return this.repo.save(productElement);
    }
   async UpdateWithParamsInBody(id:string, product:updateProductInBodyDto)
    {

        const productElement= await this.repo.findOneBy({id});
        productElement.price=product.price;
        productElement.title=product.title;
        // productElement.category=product.categoryTitle;
        productElement.weight=product.weight;
        productElement.description=product.description;
        return this.repo.save(productElement);
    }
}