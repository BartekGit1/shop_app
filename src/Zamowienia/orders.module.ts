import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrdersController} from "./orders.controller";
import {OrdersService} from "./orders.service";
import {Order} from "../entities/order.entity";
import {OrderedProduct} from "../entities/orderedProducts.entity";


@Module({
    imports: [TypeOrmModule.forFeature([
        Order,
        OrderedProduct
    ])
    ],
    controllers: [OrdersController],
    providers: [OrdersService]

})

export class OrdersModule {
}