import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @Transform(({ value }) => value.trim())
  @IsString({ message: 'email is not a string' })
  @MinLength(4)
  @IsEmail()
  email: string;

  @IsStrongPassword()
  @IsString()
  password: string;
}
