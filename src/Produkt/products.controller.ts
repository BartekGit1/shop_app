import {Body, Controller, Get, Param, Post, Put} from "@nestjs/common";
import {ProductsService} from "./products.service";
import {addProductDto} from "../dto/add-product-dto";
import {updateProductInLinkDto} from "../dto/update-product-dto";
import {updateProductInBodyDto} from "../dto/update-product-in-body-dto";

var zmienna = 'dfcc63ff-b1e2-40d8-aa85-8078930676e9';


@Controller()
export class ProductsController {
    private productsService;

    constructor(productsService: ProductsService) {
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
        // opinion.productId=zmienna;
        return await this.productsService.create(product);
    }

//localhost:3000/products/id PUT
    @Put('products/:id')
    updateInLink(@Param('id') productId: string, @Body() body: updateProductInLinkDto) {

        this.productsService.updateWithLink(productId, body);
    }

//localhost:3000/products PUT
    @Put('products')
    updateParamsInBody(@Body() body: updateProductInBodyDto) {
        const productId = body.id;
        this.productsService.UpdateWithParamsInBody(productId, body);
    }


}