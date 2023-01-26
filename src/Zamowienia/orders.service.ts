import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Order} from "../entities/order.entity";
import {addOrderDto} from "../dto/add-order-dto";
import {OrderedProduct} from "../entities/orderedProducts.entity";
import {OrderState} from "../entities/orderState.entity";
import {Product} from "../entities/product.entity";
import {orderStateEnum} from "../enum/orderStateEnum";


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

        const productElement = await this.orderRepository.findOneBy({id: order.id});

        if (order.id.length == 0) {
            throw new HttpException('id cant be null', HttpStatus.BAD_REQUEST)
        } else if (order.userName.length == 0) {
            throw new HttpException('username cant be empty', HttpStatus.BAD_REQUEST)
        } else if (order.email.length == 0) {
            throw new HttpException('email cant be empty', HttpStatus.BAD_REQUEST)
        } else if (order.phoneNumber.length == 0) {
            throw new HttpException('phone number cant be empty', HttpStatus.BAD_REQUEST)
        } else if (order.amountOfOrderedProducts <= 0) {
            throw new HttpException('amount of ordered product must be positive number', HttpStatus.BAD_REQUEST)
        }

        const Status = await this.orderStateRepository.findOne({where: {title: orderStateEnum.NOTAPPROVED}});

        const products = await this.productRepository.findOne({where: {title: order.orderedProducts}});
        if (products == null) {
            throw new HttpException('specified product doesnt exist in database', HttpStatus.NOT_FOUND)

        } else {
            const zamowienie = this.orderRepository.create(
                {

                    // orderDate: order.orderDate,
                    userName: order.userName,
                    email: order.email,
                    phoneNumber: order.phoneNumber,
                    status: Status.id,
                    id: order.id



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

        const newState = await this.orderStateRepository.findOneBy({title: orderStateEnum[stan]})
        const productElement = await this.orderRepository.findOne({
            where: {id: id},
            relations: ['status'],
            // loadRelationIds: true
        });
        productElement.status = newState.id;
        if(stan==orderStateEnum.APPROVED){
            productElement.orderDate=new Date();
            productElement.orderDate.setHours(productElement.orderDate.getHours()+1);
        }
        return this.orderRepository.save(productElement);
    }

    async getOrderByState(state: string) {

        const newStatus = await this.orderStateRepository.findOneBy({id:parseInt(state)})
        return this.orderRepository.createQueryBuilder('order').leftJoinAndSelect('order.orderedProducts', 'orderedProducts')
            .where('order.status=:abc', {abc: newStatus.id}).getMany();
        // return await this.orderRepository.find({
        //     where:{orderStatus:state}
        // })


    }

}