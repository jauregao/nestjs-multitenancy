import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() data: LoginDto, @Res() res: Response) {
    const user = await this.authService.login(data);
    return res.status(HttpStatus.OK).json(user);
  }
}
