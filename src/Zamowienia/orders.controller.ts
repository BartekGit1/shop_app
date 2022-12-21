import {Controller, Get} from "@nestjs/common";

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