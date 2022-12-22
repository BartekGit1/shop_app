import {IsDate, IsNumber, IsString} from "class-validator";
import {Column, PrimaryColumn} from "typeorm";

export class addOrderDto {
    @IsString()
    id: number;

    @IsDate()
    orderDate: Date;

    @IsString()
    userName: String;

    @IsString()
    email: String;

    @IsString()
    phoneNumber: String;

    @IsString()
    categoryTitle: string;







}

