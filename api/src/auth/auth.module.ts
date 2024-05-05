// auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailerService } from 'src/mailer/mailer.service';
import { ValidateUserService } from 'src/validate-user/validate-user.service';
import { MailerModule } from 'src/mailer/mailer.module';
import { ValidateUserModule } from 'src/validate-user/validate-user.module';
import { FailedLoginService } from 'src/failed-login/failed-login.service';
import { FailedLoginModule } from 'src/failed-login/failed-login.module';
import { WorkersStatusService } from 'src/workers-status/workers-status.service';
import { KnowWorkService } from 'src/know-work/know-work.service';
import { RecoverHolidaysWorkersService } from 'src/recover-holidays-workers/recover-holidays-workers.service';
import { DataCheckinsService } from 'src/data-checkins/data-checkins.service';
import { HolidaysCompanyService } from 'src/company-holidays/company-holidays.service';
import { CompanyWorkdayService } from 'src/company-workday/company-workday.service';
import { WorkersHolidaysService } from 'src/workers-holidays/workers-holidays.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.API_KEY, // Firma por la que se firma la codificacion , proviene del .env
      signOptions: { expiresIn: "365d" }, // tiempo de expiración del token
    }),
    PrismaModule ,
    MailerModule , 
    ValidateUserModule , 
    FailedLoginModule
  ],
  providers: [AuthService, JwtStrategy , PrismaService , UsersService , MailerService , ValidateUserService, FailedLoginService  , AuthService ,DataCheckinsService ,  ValidateUserService , HolidaysCompanyService, FailedLoginService , WorkersStatusService , KnowWorkService , RecoverHolidaysWorkersService , CompanyWorkdayService ,  UsersService , WorkersHolidaysService],
  controllers: [AuthController],
  exports: [JwtModule, PassportModule , AuthModule , MailerModule , ValidateUserModule],
})
export class AuthModule {}
