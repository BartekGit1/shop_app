import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";



export enum orderStateEnum {
    NOTAPPROVED = 'NOTAPPROVED',
    APPROVED = 'APPROVED',
    CANCELED = 'CANCELED',
    COMPLETED = 'COMPLETED'

}

@Entity()
export class OrderState {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        type: 'enum',
        enum: orderStateEnum,
        default: orderStateEnum.NOTAPPROVED,
    })
    orderState: orderStateEnum;


}
