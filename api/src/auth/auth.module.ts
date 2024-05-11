import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ValidateUserService } from 'src/validate-user/validate-user.service';
import { ValidateUserModule } from 'src/validate-user/validate-user.module';
import { FailedLoginService } from 'src/failed-login/failed-login.service';
import { FailedLoginModule } from 'src/failed-login/failed-login.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.API_KEY,
      signOptions: { expiresIn: '365d' },
    }),
    PrismaModule,
    ValidateUserModule,
    FailedLoginModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    PrismaService,
    UsersService,
    ValidateUserService,
    FailedLoginService,
  ],
  controllers: [AuthController],
  exports: [
    PassportModule,
    JwtModule,
    PrismaModule,
    ValidateUserModule,
    FailedLoginModule,
    AuthService,
    AuthModule,
  ],
})
export class AuthModule {}
