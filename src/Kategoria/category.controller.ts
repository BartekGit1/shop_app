import {Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put} from "@nestjs/common";
import {CategoryService} from "./category.service";
import {addProductDto} from "../Produkt/dto/add-product-dto";
import {QueryFailedError} from "typeorm";

@Controller()
export class CategoryController{
    private categoryService;
    constructor(categoryService:CategoryService) {
        this.categoryService=categoryService;
    }

    @Get('categories')
    async getAll()
{

    return await this.categoryService.getAllCategories();

}

    @Post('categories/:nazwa')
    addCategoryController(@Param('nazwa')nazwa)
    {

        return this.categoryService.addCategory(nazwa);
    }




}