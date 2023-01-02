import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ObjectType} from "type-graphql/dist/decorators";
import {orderStateEnum} from "../enum/orderStateEnum";




@ObjectType()
@Entity()
export class OrderState {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        unique: true,
        type: 'enum',
        enum: orderStateEnum,
        default: orderStateEnum.NOTAPPROVED,
    })
    title: orderStateEnum;


}
