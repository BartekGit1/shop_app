import {Body, Controller, Get, Post} from "@nestjs/common";


import {addOrderDto} from "../dto/add-order-dto";
import {OrderedProductService} from "./orderedProduct.service";
import {OrdersService} from "./orders.service";

@Controller()
export class OrdersController {
    private ordersService;
    private orderedProductService;

    // constructor(ordersService: OrdersService) {
    constructor(ordersService: OrdersService,orderedProductService:OrderedProductService) {
        this.ordersService = ordersService;
        this.orderedProductService=orderedProductService;
    }

// //localhost:3000/status
//     @Get('orders')
//     getProducts() {
//         return this.ordersService.getAll();
//     }

    //localhost:3000/orders POST
    @Post('orders')
    async addOrder(@Body() orders: addOrderDto) {
         await this.ordersService.create(orders);
         // await this.orderedProductService.addOrderedProducts(orders.orderedProducts,orders.amountOfOrderedProducts);
         // await this.orderedProductService.addOrderedProducts(orders);
        return;
    }

    @Get('orders')
    async getAllOrders() {
        return this.ordersService.getAllOrd();
        // await this.orderedProductService.addOrderedProducts(orders.orderedProducts,orders.amountOfOrderedProducts);
        // await this.orderedProductService.addOrderedProducts(orders);

    }

}