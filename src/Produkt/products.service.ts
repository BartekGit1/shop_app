import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "../entities/product.entity";
import {Repository} from "typeorm";
import {addProductDto} from "../dto/add-product-dto";
import {updateProductInBodyDto} from "../dto/update-product-in-body-dto";
import {updateProductInLinkDto} from "../dto/update-product-dto";


@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private repo: Repository<Product>) {
    }

    getAll() {
        return this.repo.find();
    }

    getAllProductsById(id: string) {
        return (this.repo.findBy({id}));
    }

    async create(product: addProductDto) {
        if(product.id.length==0)
        {
            throw new HttpException('id cant be empty', HttpStatus.BAD_REQUEST)
        }
        else if (product.price <= 0) {
            throw new HttpException('price must be higher than 0', HttpStatus.BAD_REQUEST)
        } else if (product.weight <= 0) {
            throw new HttpException('weight must be higher than 0', HttpStatus.BAD_REQUEST)
        } else if (product.description.length == 0) {
            throw new HttpException('description cant be empty', HttpStatus.BAD_REQUEST)
        } else if (product.title.length == 0) {
            throw new HttpException('title cant be empty', HttpStatus.BAD_REQUEST)
        }
        else {
            const data = this.repo.create(product);
            return this.repo.save(data);
        }
    }

    async updateWithLink(id: string, product: updateProductInLinkDto) {
        const productElement = await this.repo.findOneBy({id});

            productElement.price = product.price;
            productElement.title = product.title;
            productElement.categoryTitle = product.categoryTitle;
            productElement.weight = product.weight;
            productElement.description = product.description;
            return this.repo.save(productElement);
    }

    async UpdateWithParamsInBody(id: string, product: updateProductInBodyDto) {
        const productElement = await this.repo.findOneBy({id});

            productElement.price = product.price;
            productElement.title = product.title;
            productElement.categoryTitle = product.categoryTitle;
            productElement.weight = product.weight;
            productElement.description = product.description;
            return this.repo.save(productElement);
    }
}