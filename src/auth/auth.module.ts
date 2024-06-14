import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { PartnerUsersController } from './partner-users/partner-users.controller';
import { CommonUsersController } from './users/common-users.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '12h',
      },
    }),
  ],
  providers: [UsersService, AuthService],
  controllers: [CommonUsersController, PartnerUsersController, AuthController],
})
export class AuthModule {}
