import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {ObjectType} from "type-graphql/dist/decorators";
import {Order} from "./order.entity";



export enum orderStateEnum {
    NOTAPPROVED = 'NOTAPPROVED',
    APPROVED = 'APPROVED',
    CANCELED = 'CANCELED',
    COMPLETED = 'COMPLETED'

}
@ObjectType()
@Entity()
export class OrderState {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column(   {
        unique:true,
        type: 'enum',
        enum: orderStateEnum,
        // default: orderStateEnum.NOTAPPROVED,
    })
    title: orderStateEnum.NOTAPPROVED;




}
