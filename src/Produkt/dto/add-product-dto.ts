import {Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "../../entities/category.entity";
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
    @IsString()
    categoryTitle:string;

}

