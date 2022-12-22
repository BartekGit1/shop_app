import {Body, Controller, Get, Post} from "@nestjs/common";
import {OrdersService} from "./orders.service";
import {addOrderDto} from "../dto/add-order-dto";

@Controller()
export class OrdersController {
    private ordersService;

    constructor(ordersService: OrdersService) {
        this.ordersService = ordersService;
    }

//localhost:3000/status
    @Get('orders')
    getProducts() {
        return this.ordersService.getAll();
    }

    //localhost:3000/orders POST
    @Post('orders')
    async addOrder(@Body() orders: addOrderDto) {
        return await this.ordersService.create(orders);
    }

}