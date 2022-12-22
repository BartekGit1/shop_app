import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
// import {OrderState} from "../entities/orderState.entity";
import {Order} from "../entities/order.entity";

@Injectable()
export class OrdersService{
    constructor(@InjectRepository(Order)private repo : Repository<Order>) {}
    getAll(){
        console.log(this.repo.find());

        return this.repo.find();
    }

}