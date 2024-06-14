import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { PartnerUsersController } from './partner-users/partner-users.controller';
import { CommonUsersController } from './users/common-users.controller';
import { AuthController } from './auth.controller';

@Module({
  providers: [UsersService],
  controllers: [CommonUsersController, PartnerUsersController, AuthController],
})
export class AuthModule {}
