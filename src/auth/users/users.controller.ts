import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { UserPresenter } from './user.presenter';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(data);
    const newUser = new UserPresenter(user);
    return res.status(HttpStatus.CREATED).json(newUser);
  }
}
