import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePartnerUserDto } from './dto/create-partner-user.dto';
import { CreateCommonUserDto } from './dto/create-common-user.dto';
import { UserRoles } from './user-roles';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPartnerUser(data: CreatePartnerUserDto) {
    const user = await this.prismaService.user.create({
      data: {
        ...data,
        password: this.generateHash(data.password),
        roles: [UserRoles.PARTNER],
      },
    });
    return user;
  }

  async createCommonUser(data: CreateCommonUserDto) {
    const user = await this.prismaService.user.create({
      data: {
        ...data,
        password: this.generateHash(data.password),
        roles: [UserRoles.USER],
      },
    });
    return user;
  }

  generateHash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
}
