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
        // console.log(this.repo.find());
        // console.log("aaa");
        console.log(this.orderRepository.find());
        return this.orderRepository.find();
    }
    async create(order: addOrderDto) {
        const zamowienie = this.orderRepository.create(
            {
                orderDate: "data",
                userName: "test",
                email: "email",
                phoneNumber: "12421"
            }
        )

    await this.orderRepository.save(zamowienie);
        // this.orderRepository.save(zamowienie);

        const task1 = this.orderedProductRepository.create({
            orderedProducts: '["ab","cd"]',
            amountOfOrderedProducts: 1
            // orderId:zamowienie.orderId;
        });
        // task1.orderId=zamowienie;
        task1.order=zamowienie.id;
         this.orderedProductRepository.save(task1);


        // zamowienie.orderedProducts = task1;




        // console.log(order);
        //
        // const data = this.repo.create(order);
        // console.log("uaa"+order.orderedProducts);
        // const data2 = this.repo2.create(order.orderedProducts);
        // this.repo.save(data);
        // this.repo2.save(data2);
        // return;
    }

}