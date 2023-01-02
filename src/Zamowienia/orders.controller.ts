import {Body, Controller, Get, Param, Post, Put} from "@nestjs/common";


import {addOrderDto} from "../dto/add-order-dto";

import {OrdersService} from "./orders.service";

@Controller()
export class OrdersController {
    private ordersService;

    constructor(ordersService: OrdersService) {
        this.ordersService = ordersService;
    }



    //localhost:3000/orders POST
    @Post('orders')
    async addOrder(@Body() orders: addOrderDto) {
        await this.ordersService.create(orders);
        return;
    }

    @Get('orders')
    async getAllOrders() {
        return this.ordersService.getAllOrd();
    }


    @Get('orders/status/:id')
    async getOrderByState(@Param('id') status: string) {
        return await this.ordersService.getOrderByState(status);
    }

    @Put('orders/:id')
    UpdateOrder(@Param('id') productId: string, @Body() body: { orderStatus: string }) {

        this.ordersService.UpdateStateById(productId, body.orderStatus);
        return;
    }
}