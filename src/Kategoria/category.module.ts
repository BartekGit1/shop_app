import {Module} from "@nestjs/common";
import {CategoryController} from "./category.controller";
import {CategoryService} from "./category.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "../entities/category.entity";

@Module(
{
    imports:[TypeOrmModule.forFeature([
        Product,
    ])
    ],
    controllers:[CategoryController],
    providers:[CategoryService]
})

export class CategoryModule{

}