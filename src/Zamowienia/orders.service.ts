import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
// import {OrderState} from "../entities/orderState.entity";
import {Order} from "../entities/order.entity";
import {addOrderDto} from "../dto/add-order-dto";
import {OrderedProduct} from "../entities/orderedProducts.entity";
import {Product} from "../entities/product.entity";

@Injectable()
export class OrdersService{
    constructor(
        @InjectRepository(OrderedProduct) private orderedProductRepository: Repository<OrderedProduct>,
        @InjectRepository(Order)private orderRepository : Repository<Order>) {}
    getAllOrd(){
    return this.orderRepository.createQueryBuilder('order').leftJoinAndSelect('order.orderedProducts','orderedProducts').getMany();

    }
    async create(order: addOrderDto) {
        const zamowienie = this.orderRepository.create(
            {
                orderDate: order.orderDate,
                userName: order.userName,
                email: order.email,
                phoneNumber: order.phoneNumber
            }
        )

    await this.orderRepository.save(zamowienie);
        const task1 = this.orderedProductRepository.create({
            orderedProducts:order.orderedProducts,
            amountOfOrderedProducts: order.amountOfOrderedProducts
        });
        task1.order=zamowienie.id;
        await this.orderedProductRepository.save(task1);
    }

   async UpdateStateById(id: string,stan:string){
        const productElement = await this.orderRepository.findOneBy({id});
        productElement.orderStatus=stan;
        return this.orderRepository.save(productElement);
    }

      async getOrderByState(state:string)
    {
        return this.orderRepository.createQueryBuilder('order').leftJoinAndSelect('order.orderedProducts','orderedProducts')
            .where('order.orderStatus=:abc',{abc:state}).getMany();
        // return await this.orderRepository.find({
        //     where:{orderStatus:state}
        // })

    }

}