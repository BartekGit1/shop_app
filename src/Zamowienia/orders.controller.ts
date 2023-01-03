import {Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put} from "@nestjs/common";


import {addOrderDto} from "../dto/add-order-dto";

import {OrdersService} from "./orders.service";
import {orderStateEnum} from "../enum/orderStateEnum";
import {InjectRepository} from "@nestjs/typeorm";
import {Order} from "../entities/order.entity";
import {Repository} from "typeorm";
import {OrderState} from "../entities/orderState.entity";

@Controller()
export class OrdersController {
    private ordersService;

    constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
                @InjectRepository(OrderState) private orderStateRepository: Repository<OrderState>,
                ordersService: OrdersService) {
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
   async UpdateOrder(@Param('id') productId: string, @Body() body: { orderStatus: string }) {
        body.orderStatus=body.orderStatus.toUpperCase()
        if (body.orderStatus == orderStateEnum.CANCELED || body.orderStatus == orderStateEnum.NOTAPPROVED || body.orderStatus == orderStateEnum.COMPLETED || body.orderStatus == orderStateEnum.APPROVED) {

            const newState = await this.orderStateRepository.findOneBy({title: orderStateEnum[body.orderStatus]})
            const COMPLETED = await this.orderStateRepository.findOneBy({title: orderStateEnum.COMPLETED})
            const NOTAPPROVED = await this.orderStateRepository.findOneBy({title: orderStateEnum.NOTAPPROVED})
            const APPROVED = await this.orderStateRepository.findOneBy({title: orderStateEnum.APPROVED})
            const CANCELED = await this.orderStateRepository.findOneBy({title: orderStateEnum.CANCELED})
            const productElement = await this.orderRepository.findOne({
                where: {id: productId},
                relations: ['status'],
                loadRelationIds: true
            });

            if (productElement == null) {
                throw new HttpException('wrong id', HttpStatus.NOT_FOUND)
            } else if (productElement.status == newState.id) {
                throw new HttpException('new status cant be the same as old one', HttpStatus.FORBIDDEN);
            } else if (productElement.status == COMPLETED.id && newState.id == NOTAPPROVED.id) {
                throw new HttpException('status cant be changed from completed to not approved', HttpStatus.FORBIDDEN);
            } else if (productElement.status == CANCELED.id) {
                throw new HttpException('status of canceled order cant be changed', HttpStatus.FORBIDDEN);
            } else {
                this.ordersService.UpdateStateById(productId, body.orderStatus);
                return;
            }
        }
        else {
                throw new HttpException('this status doesnt exist in database', HttpStatus.NOT_FOUND)
            }
    }
}