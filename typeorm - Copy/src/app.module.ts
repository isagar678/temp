import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/user.entity';
// import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import { Order } from './typeorm/entities/order.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Dwarkesh@1',
    database: 'mydb',
    entities:[User,Order],
    synchronize: true,
  }),  OrderModule, UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
