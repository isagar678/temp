import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}
    @Get()
    async getUsers(){
        return this.userService.findUsers()
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto){
        this.userService.createUser(createUserDto)
    }

    @Put(':id')
    updateUserById(@Param('id',ParseIntPipe) id:number,
     @Body() updateUserDto:UpdateUserDto){
        this.userService.updateUser(id,updateUserDto)
    }

    @Delete(':id')
    deleteUserById(@Param('id',ParseIntPipe) id:number){
        this.userService.deleteUser(id)
    }
    
}
