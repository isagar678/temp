import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ){}
  async findOneBy(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ email: email });
  }
  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create({username:createUserDto.username,email:createUserDto.email,password:createUserDto.password})
  }
}
