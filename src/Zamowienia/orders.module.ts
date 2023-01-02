import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrdersController} from "./orders.controller";
import {OrdersService} from "./orders.service";
import {Order} from "../entities/order.entity";
import {OrderedProduct} from "../entities/orderedProducts.entity";
import {OrderState} from "../entities/orderState.entity";
import {Product} from "../entities/product.entity";


@Module({
    imports: [TypeOrmModule.forFeature([
        Order,
        OrderedProduct,
        OrderState,
        Product
    ])
    ],
    controllers: [OrdersController],
    providers: [OrdersService]

})

export class OrdersModule {
}