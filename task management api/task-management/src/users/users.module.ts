import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  providers: [UsersService],
  exports:[UsersService],
  imports:[TypeOrmModule.forFeature([UserEntity])]
})
export class UsersModule {}
