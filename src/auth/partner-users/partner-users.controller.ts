import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { CreatePartnerUserDto } from '../users/dto/create-partner-user.dto';
import { Response } from 'express';
import { UserPresenter } from '../users/user.presenter';

@Controller('partners/users')
export class PartnerUsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() data: CreatePartnerUserDto, @Res() res: Response) {
    const user = await this.userService.createPartnerUser(data);
    const newUser = new UserPresenter(user);
    return res.status(HttpStatus.CREATED).json(newUser);
  }
}
