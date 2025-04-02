import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsNotEmpty({
    message: `Please enter your email`,
  })
  @IsEmail()
  email: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  password: string;
}
