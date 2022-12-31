import {ArrayNotEmpty, IsDate, IsInt, IsNumber, IsString} from "class-validator";
import {Column, PrimaryColumn} from "typeorm";
import {Field} from "type-graphql/dist/decorators";
import {OrderedProduct} from "../entities/orderedProducts.entity";

export class addOrderDto {
    // @IsString()
    // id: number;

    // @IsDate()
    // orderDate: Date;
    @IsString()
    orderDate: String;

    @IsString()
    userName: String;

    @IsString()
    email: String;

    @IsString()
    phoneNumber: String;

    @IsInt()
    amountOfOrderedProducts:number;

    @IsString()
    orderedProducts:string;
    // @Field(()=>[OrderedProductInput])
    // @IsString()
    // // @ArrayNotEmpty()
    // orderedProducts?:OrderedProductInput;
    //
    // @Field(()=>[OrderedProductInput])
    // @IsString()
    // // @ArrayNotEmpty()
    // amountOfOrderedProducts?:OrderedProductInput;

}

export class OrderedProductInput{
    @IsInt()
    amountOfOrderedProducts:number;

    @IsInt()
    orderId:number;

    @IsString()
    orderedProducts:string;
}

