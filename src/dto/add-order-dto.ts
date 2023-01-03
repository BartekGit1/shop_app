import {IsEmail, IsInt, IsMobilePhone, IsString} from "class-validator";

export class addOrderDto {
    @IsString()
    id: string;

    // @IsDate()
    // @IsNotEmpty()
    // @IsString()
    // orderDate: String | null;

    @IsString()
    userName: string;

    @IsEmail()
    email: string;

    @IsMobilePhone()
    phoneNumber: string;

    @IsInt()
    amountOfOrderedProducts: number;

    @IsString()
    orderedProducts: string;

}

