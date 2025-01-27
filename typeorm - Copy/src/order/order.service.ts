import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/typeorm/entities/order.entity';
import { User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
// import { Order } from '../entities/order.entity';
// import { User } from '../entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 2. Place Order
  async placeOrder(userId: number, order: Partial<Order>): Promise<Order> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    return this.orderRepository.save({ ...order, user });
  }

  // 3. Get Order by ID
  async getOrderById(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['user'],
    });
    if (!order) throw new NotFoundException(`Order with ID ${orderId} not found`);
    return order;
  }
}
