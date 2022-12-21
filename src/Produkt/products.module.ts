import {Module} from "@nestjs/common";
import {ProductsController} from "./products.controller"
import {ProductsService} from "./products.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Opinion} from "../entities/product.entity";

@Module({
    imports:[TypeOrmModule.forFeature([
        Opinion,
    ])
    ],
    controllers:[ProductsController],
    providers:[ProductsService]
})

export class ProductsModule{}