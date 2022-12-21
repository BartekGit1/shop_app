import {Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "../../entities/category.entity";
import {IsNumber, IsString, IsUUID} from "class-validator";

export class addProductDto {
    @IsString()
    id: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    weight: number;

    // @IsString()
    // categoryTitle: string;
    @IsUUID()
    productId:string;

}

