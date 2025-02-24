import { Transform } from "class-transformer";
import { IsEmail, IsPhoneNumber, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {
    @Transform(({value})=>value.trim())
    @IsString({message:'name not string'})
    @MinLength(3,{message:'least 3'})
    name:string

    @Transform(({value})=>value.trim())
    @IsString({message:'email is not a string'})
    @MinLength(4)
    @IsEmail()
    email:string

    @IsStrongPassword()
    @IsString()
    password:string

    @IsPhoneNumber('IN')
    @IsString()
    phone:string

}
