import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(email, pass) {
    const user = await this.usersService.findOneBy(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user?.id, email: user?.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(payload: CreateUserDto) {
    const user = await this.usersService.create(payload);
    return user;
  }
}
