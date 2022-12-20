import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {OrderState} from "../entities/orderState.entity";

@Injectable()
export class StatesService{
    constructor(@InjectRepository(OrderState)private repo : Repository<OrderState>) {}
    getAll(){

        return this.repo.find();
    }

}