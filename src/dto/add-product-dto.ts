import {IsNumber, IsString} from "class-validator";

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

    @IsString()
    categoryTitle: string;

}

