import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
// import {OrderState} from "../entities/orderState.entity";
import {Order} from "../entities/order.entity";
import {addOrderDto} from "../dto/add-order-dto";
import {OrderedProduct} from "../entities/orderedProducts.entity";
import {OrderState, orderStateEnum} from "../entities/orderState.entity";

@Injectable()
export class OrdersService{
    constructor(
        @InjectRepository(OrderedProduct) private orderedProductRepository: Repository<OrderedProduct>,
        @InjectRepository(OrderState) private orderStateRepository: Repository<OrderState>,
        @InjectRepository(Order)private orderRepository : Repository<Order>) {}
    getAllOrd(){
    return this.orderRepository.createQueryBuilder('order').leftJoinAndSelect('order.orderedProducts','orderedProducts').getMany();

    }
    async create(order: addOrderDto) {

        const statystyki=await this.orderStateRepository.findOne({where:{title:orderStateEnum.NOTAPPROVED}});

        // console.log(statystyki.);

        const zamowienie = this.orderRepository.create(
            {
                orderDate: order.orderDate,
                userName: order.userName,
                email: order.email,
                phoneNumber: order.phoneNumber,
                status:statystyki.id

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
        // const productElement = await this.orderRepository.findOneBy({id});
        const productElement = await this.orderRepository.findOneBy({id:id});

        const newState = await  this.orderStateRepository.findOneBy({title:orderStateEnum[stan]})


console.log(newState.title)
console.log(productElement.status)

        productElement.status=newState.id;
        return this.orderRepository.save(productElement);
    }

      async getOrderByState(state:string)
    {

        const newStatus = await  this.orderStateRepository.findOneBy({title:orderStateEnum[state]})
        return this.orderRepository.createQueryBuilder('order').leftJoinAndSelect('order.orderedProducts','orderedProducts')
            .where('order.status=:abc',{abc:newStatus.id}).getMany();
        // return await this.orderRepository.find({
        //     where:{orderStatus:state}
        // })

    }

}