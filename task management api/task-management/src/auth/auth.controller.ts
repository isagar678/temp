import {
  Controller,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email,signInDto.password);
  }

  @Post('signup')
  signUp(@Body(ValidationPipe) signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }
}
