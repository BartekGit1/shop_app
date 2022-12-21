import {Controller, Get, Param, Post} from "@nestjs/common";
import {CategoryService} from "./category.service";

@Controller()
export class CategoryController {
    private categoryService;

    constructor(categoryService: CategoryService) {
        this.categoryService = categoryService;
    }

    @Get('categories')
    async getAll() {

        return await this.categoryService.getAllCategories();

    }

    @Post('categories/:nazwa')
    addCategoryController(@Param('nazwa') nazwa) {

        return this.categoryService.addCategory(nazwa);
    }


}