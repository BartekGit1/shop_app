import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Order} from "../entities/order.entity";
import {addOrderDto} from "../dto/add-order-dto";
import {OrderedProduct} from "../entities/orderedProducts.entity";
import {OrderState, orderStateEnum} from "../entities/orderState.entity";
import {Product} from "../entities/product.entity";


@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderedProduct) private orderedProductRepository: Repository<OrderedProduct>,
        @InjectRepository(OrderState) private orderStateRepository: Repository<OrderState>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Order) private orderRepository: Repository<Order>) {
    }

    getAllOrd() {
        return this.orderRepository.createQueryBuilder('order').leftJoinAndSelect('order.orderedProducts', 'orderedProducts').getMany();

    }

    async create(order: addOrderDto) {

        if (order.userName.length == 0) {
            throw new HttpException('username cant be empty', HttpStatus.BAD_REQUEST)
        } else if (order.email.length == 0) {
            throw new HttpException('email cant be empty', HttpStatus.BAD_REQUEST)
        } else if (order.phoneNumber.length == 0) {
            throw new HttpException('phone number cant be empty', HttpStatus.BAD_REQUEST)
        }

        const statystyki = await this.orderStateRepository.findOne({where: {title: orderStateEnum.NOTAPPROVED}});

        const products = await this.productRepository.findOne({where: {title: order.orderedProducts}});
        if (products == null) {
            throw new HttpException('specified product doesnt exist in database', HttpStatus.NOT_FOUND)

        } else {
            const zamowienie = this.orderRepository.create(
                {

                    orderDate: order.orderDate,
                    userName: order.userName,
                    email: order.email,
                    phoneNumber: order.phoneNumber,
                    status: statystyki.id,
                    id:order.id


                }
            )

            await this.orderRepository.save(zamowienie);
            const task1 = this.orderedProductRepository.create({
                orderedProducts: order.orderedProducts,
                amountOfOrderedProducts: order.amountOfOrderedProducts
            });
            task1.order = zamowienie.id;
            await this.orderedProductRepository.save(task1);
        }
    }

    async UpdateStateById(id: string, stan: string) {

        // const productElement = await this.orderRepository.findOneBy({id:id});
        const newState = await this.orderStateRepository.findOneBy({title: orderStateEnum[stan]})
        const productElement = await this.orderRepository.findOne({
            where: {id: id},
            relations: ['status'],
            loadRelationIds: true
        });
        console.log("acotujest")
console.log(productElement.status)
        if (productElement == null) {
            throw new HttpException('wrong id', HttpStatus.NOT_FOUND)
        } else if (productElement.status == newState.id) {
            throw new HttpException('new status cant be the same as old one', HttpStatus.FORBIDDEN);
        } else if (productElement.status == 1 && newState.id == 2) {
            throw new HttpException('status cant be changed from completed to not approved', HttpStatus.FORBIDDEN);
        } else if (productElement.status == 4) {
            throw new HttpException('status of canceled order cant be changed', HttpStatus.FORBIDDEN);
        } else if (newState.id != 1 && newState.id != 2 && newState.id != 3 && newState.id != 4) {
            throw new HttpException('this status doesnt exist in database', HttpStatus.NOT_FOUND)
        } else {
            productElement.status = newState.id;
            return this.orderRepository.save(productElement);

        }
    }

    async getOrderByState(state: string) {

        const newStatus = await this.orderStateRepository.findOneBy({title: orderStateEnum[state]})
        return this.orderRepository.createQueryBuilder('order').leftJoinAndSelect('order.orderedProducts', 'orderedProducts')
            .where('order.status=:abc', {abc: newStatus.id}).getMany();
        // return await this.orderRepository.find({
        //     where:{orderStatus:state}
        // })

    }

}