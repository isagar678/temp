import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/typeorm/entities/user.entity';
import { CreateUserDto } from 'src/dtos/create-user.dto';
// import { UserService } from '../services/user.service';
// import { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('bulk')
  async createUsers(@Body() users: CreateUserDto[]): Promise<User[]> {
    return this.userService.createUsersInBulk(users);
  }

  @Get(':id/orders')
  async getOrdersByUserId(@Param('id') userId: string) {
    return this.userService.getOrdersByUserId(Number(userId));
  }

  @Get()
  async getAllUsersWithOrders() {
    return this.userService.getAllUsersWithOrders();
  }

  @Delete(':id/orders')
  async deleteOrdersOfUser(@Param('id') userId: string) {
    await this.userService.deleteOrdersOfUser(Number(userId));
    return { message: `All orders of user ${userId} have been deleted` };
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    await this.userService.deleteUser(Number(userId));
    return { message: `User ${userId} and all their orders have been deleted` };
  }
}
