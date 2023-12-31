import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './user.entity';
import { Auth } from 'src/auth/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Auth()
  @Post()
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @Auth()
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }
  @Auth()
  @Post('search')
  searchUser(@Body() searchCriteria: any): Promise<User[]> {
    console.log('control');
    return this.userService.searchUsersByCriteria(searchCriteria);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(userId, user);
  }

  @Auth()
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) userId: number): Promise<HttpStatus> {
    return this.userService.delete(userId);
  }
}
