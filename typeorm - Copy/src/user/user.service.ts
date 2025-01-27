import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { Order } from 'src/typeorm/entities/order.entity';
import { User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
// import { User } from '../entities/user.entity';
// import { Order } from '../entities/order.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // 1. Create Users in Bulk
  async createUsersInBulk(users: CreateUserDto[]): Promise<User[]> {
    if (!users || users.length === 0) {
      throw new Error('No users provided in the request body.');
    }
  
    const createdUsers = this.userRepository.create(users);
    return this.userRepository.save(createdUsers);
  }
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto); // Create a user instance
    return this.userRepository.save(user); // Save the user to the database
  }

  // 4. Get All Orders of a Particular User
  async getOrdersByUserId(userId: number): Promise<Order[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['orders'],
    });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    return user.orders;
  }

  // 5. Get All Users with All Orders
  async getAllUsersWithOrders(): Promise<User[]> {
    return this.userRepository.find({ relations: ['orders'] });
  }

  // 6. Delete All Orders of a User
  async deleteOrdersOfUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    await this.orderRepository.delete({ user: { id: userId } });
  }

  // 7. Delete User (Including All Orders)
  async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    await this.userRepository.remove(user);
  }
}
