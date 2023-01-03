import {Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put} from "@nestjs/common";
import {ProductsService} from "./products.service";
import {addProductDto} from "../dto/add-product-dto";
import {updateProductInLinkDto} from "../dto/update-product-dto";
import {updateProductInBodyDto} from "../dto/update-product-in-body-dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "../entities/product.entity";
import {Repository} from "typeorm";
import {Category} from "../entities/category.entity";

@Controller()
export class ProductsController {

    private productsService;

    constructor(@InjectRepository(Product) private repo: Repository<Product>, @InjectRepository(Category) private categoryRepository: Repository<Category>, productsService: ProductsService) {
        this.productsService = productsService;
    }

//localhost:3000/products
    @Get('products')
    getProducts() {
        return this.productsService.getAll();
    }

//localhost:3000/products/id
    @Get('/products/:id')
    getProductById(@Param('id') productId: string) {
        return this.productsService.getAllProductsById(parseInt(productId));
    }

//localhost:3000/products POST
    @Post('products')
    async addProduct(@Body() product: addProductDto) {
        return await this.productsService.create(product);
    }

//localhost:3000/products/id PUT
    @Put('products/:id')
    async updateInLink(@Param('id') productId: string, @Body() body: updateProductInLinkDto) {
        const productElement = await this.repo.findOneBy({id: productId});
        const category = await this.categoryRepository.findOneBy({title: body.categoryTitle});
        if (category == null) {
            throw new HttpException('this category doesnt exist in database', HttpStatus.NOT_FOUND)
        } else if (productElement == null) {
            throw new HttpException('wrong id', HttpStatus.NOT_FOUND)
        } else if (body.price <= 0) {
            throw new HttpException('price must be higher than 0', HttpStatus.BAD_REQUEST)
        } else if (body.weight <= 0) {
            throw new HttpException('weight must be higher than 0', HttpStatus.BAD_REQUEST)
        } else if (body.description.length == 0) {
            throw new HttpException('description cant be empty', HttpStatus.BAD_REQUEST)
        } else if (body.title.length == 0) {
            throw new HttpException('title cant be empty', HttpStatus.BAD_REQUEST)
        } else {

            this.productsService.updateWithLink(productId, body);
        }
    }

//localhost:3000/products PUT
    @Put('products')
    async updateParamsInBody(@Body() body: updateProductInBodyDto) {
        const productElement = await this.repo.findOneBy({id: body.id});
        const category = await this.categoryRepository.findOneBy({title: body.categoryTitle});
        if (category == null) {
            throw new HttpException('this category doesnt exist in database', HttpStatus.NOT_FOUND)
        } else if (productElement == null) {
            throw new HttpException('wrong id', HttpStatus.NOT_FOUND)
        } else if (body.price <= 0) {
            throw new HttpException('price must be higher than 0', HttpStatus.BAD_REQUEST)
        } else if (body.weight <= 0) {
            throw new HttpException('weight must be higher than 0', HttpStatus.BAD_REQUEST)
        } else if (body.description.length == 0) {
            throw new HttpException('description cant be empty', HttpStatus.BAD_REQUEST)
        } else if (body.title.length == 0) {
            throw new HttpException('title cant be empty', HttpStatus.BAD_REQUEST)
        } else {
            const productId = body.id;
            this.productsService.UpdateWithParamsInBody(productId, body);
        }
    }


}