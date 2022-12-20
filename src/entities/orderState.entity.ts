import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {isNotEmpty, IsNotEmpty} from "class-validator";
import {type} from "os";
import {Category} from "./category.entity";
import {orderStateEnum} from "../enum/orderStateEnum";
import {Field} from "type-graphql/dist/decorators";
export enum ORDER_STATUS {
    NOT_CONFIRMED = 'not confirmed',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
}
@Entity()
export class OrderState
{
    @PrimaryGeneratedColumn()
    id:number;
    // @IsNotEmpty()
    // @PrimaryColumn()
    // name:String;
    @Column({
        type:'enum',
        enum:orderStateEnum,
        default: orderStateEnum.NOTAPPROVED,
    })
    orderState:string;


}
