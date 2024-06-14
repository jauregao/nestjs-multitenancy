import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateCommonUserDto } from './dto/create-common-user.dto';
import { Response } from 'express';
import { UserPresenter } from './user.presenter';
@Controller('users')
export class CommonUsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() data: CreateCommonUserDto, @Res() res: Response) {
    const user = await this.userService.createCommonUser(data);
    const newUser = new UserPresenter(user);
    return res.status(HttpStatus.CREATED).json(newUser);
  }
}
