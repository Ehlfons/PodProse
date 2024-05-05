import { Module } from '@nestjs/common';
import { UploadImgService } from './upload-img.service';
import { UploadImgController } from './upload-img.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { ValidateUserModule } from 'src/validate-user/validate-user.module';
import { ValidateUserService } from 'src/validate-user/validate-user.service';
import { FailedLoginService } from 'src/failed-login/failed-login.service';
import { WorkersStatusService } from 'src/workers-status/workers-status.service';
import { KnowWorkService } from 'src/know-work/know-work.service';
import { RecoverHolidaysWorkersService } from 'src/recover-holidays-workers/recover-holidays-workers.service';
import { CompanyWorkdayService } from 'src/company-workday/company-workday.service';
import { WorkersHolidaysService } from 'src/workers-holidays/workers-holidays.service';
import { HolidaysCompanyService } from 'src/company-holidays/company-holidays.service';
import { DataCheckinsService } from 'src/data-checkins/data-checkins.service';

@Module({
  controllers: [UploadImgController],
  providers: [UploadImgService , JwtService , UsersService , PrismaService , AuthService ,DataCheckinsService ,  ValidateUserService , HolidaysCompanyService, FailedLoginService , WorkersStatusService , KnowWorkService , RecoverHolidaysWorkersService , CompanyWorkdayService , JwtService , UsersService , WorkersHolidaysService],
  imports: [ AuthModule , ValidateUserModule]
})
export class UploadImgModule {}
