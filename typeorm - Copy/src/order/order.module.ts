import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Order } from '../entities/order.entity';
// import { User } from '../entities/user.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from 'src/typeorm/entities/order.entity';
import { User } from 'src/typeorm/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
