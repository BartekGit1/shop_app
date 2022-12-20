import {Body, Controller, Get, Param, Patch, Post, Put, Req} from "@nestjs/common";
import {OrdersService} from "./orders.service";

@Controller()
export class OrdersController {
    private ordersService;

    constructor(ordersService: OrdersController) {
        this.ordersService = ordersService;
    }

//localhost:3000/status
    @Get('orders')
    getProducts() {
        return this.ordersService.getAll();
    }

}