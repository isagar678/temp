import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from '../entities/user.entity';
// import { Order } from '../entities/order.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/typeorm/entities/user.entity';
import { Order } from 'src/typeorm/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
