import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
// import {OrderState} from "../entities/orderState.entity";
import {Order} from "../entities/order.entity";
import {addOrderDto, OrderedProductInput} from "../dto/add-order-dto";
import {OrderedProduct} from "../entities/orderedProducts.entity";

@Injectable()
export class OrderedProductService{
    constructor(@InjectRepository(OrderedProduct)private repo : Repository<OrderedProduct>) {}

    addOrderedProducts(products: OrderedProductInput[])
    {
        // console.log(products);
        // console.log("ua");
        // console.log(products2);
        // console.log("aaaa");
        // const data = this.repo.create(products);
        // this.repo.save(data);
        // for (let key in products) {
            // console.log(key+" key")
            // console.log(products+" products")
            // console.log(products[key]+"    akey")
            // console.log(products[key]);
            // console.log(products2[key]);
            // const data = this.repo.create(products[key]);
            // this.repo.save(data);
            // console.log(products[key]);
        }
        // console.log("UAAA11 "+products.amountOfOrderedProducts)
        // console.log(products);
        // console.log(products2);

    // }

}