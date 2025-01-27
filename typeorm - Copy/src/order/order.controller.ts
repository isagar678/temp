import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from 'src/typeorm/entities/order.entity';
// import { OrderService } from '../services/order.service';
// import { Order } from '../entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':userId')
  async placeOrder(
    @Param('userId') userId: string,
    @Body() order: Partial<Order>,
  ) {
    return this.orderService.placeOrder(Number(userId), order);
  }

  @Get(':id')
  async getOrderById(@Param('id') orderId: string) {
    return this.orderService.getOrderById(Number(orderId));
  }
}
