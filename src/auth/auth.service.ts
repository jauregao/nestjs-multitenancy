import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const userExists = await this.userService.findOneUser(data.email);

    if (
      !userExists ||
      !bcrypt.compareSync(data.password, userExists.password)
    ) {
      throw new BadRequestException('Invalid credentials.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = userExists;
    const token = this.jwtService.sign(result);

    return {
      user: {
        ...result,
      },
      token,
    };
  }
}
