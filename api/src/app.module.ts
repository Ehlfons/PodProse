import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HolidaysController } from './holidays/holidays.controller';
import { HolidaysModule } from './holidays/holidays.module';
import { PrismaService } from './prisma/prisma.service';
import { HolidaysService } from './holidays/holidays.service';
import { HolidaysCompanyModule } from './company-holidays/company-holidays.module';
import { CompanyService } from './company/company.service';
import { CompanyController } from './company/company.controller';
import { CompanyModule } from './company/company.module';
import { CheckinsModule } from './checkins/checkins.module';
import { PrismaModule } from './prisma/prisma.module';
import { HolidaysCompanyService } from './company-holidays/company-holidays.service';
import { HolidaysCompanyController } from './company-holidays/company-holidays.controller';
import { CheckinsController } from './checkins/checkins.controller';
import { CheckinsService } from './checkins/checkins.service';
import { DataCheckinsModule } from './data-checkins/data-checkins.module';
import { DataCheckinsService } from './data-checkins/data-checkins.service';
import { DataCheckinsController } from './data-checkins/data-checkins.controller';
import { CompanyWorkdayModule } from './company-workday/company-workday.module';
import { MailerService } from './mailer/mailer.service';
import { MailerController } from './mailer/mailer.controller';
import { MailerModule } from './mailer/mailer.module';
import { ValidateUserModule } from './validate-user/validate-user.module';
import { CompanyWorkdayService } from './company-workday/company-workday.service';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { ScheduleModule } from '@nestjs/schedule';
import { WorkersHolidaysModule } from './workers-holidays/workers-holidays.module';
import { RecoverHolidaysWorkersModule } from './recover-holidays-workers/recover-holidays-workers.module';
import { KnowWorkModule } from './know-work/know-work.module';
import { CalendarGraphicDataModule } from './calendar-graphic-data/calendar-graphic-data.module';
import { WorkersRequestModule } from './workers-request/workers-request.module';
import { CompanyVacationsYearModule } from './company-vacations-year/company-vacations-year.module';
import { WorkersHolidaysControlModule } from './workers-holidays-control/workers-holidays-control.module';
import { MulterModule } from '@nestjs/platform-express';
import { UploadImgModule } from './upload-img/upload-img.module';
import { ImagenModule } from './imagen/imagen.module';
import { FailedLoginModule } from './failed-login/failed-login.module';
import { BruteForceMiddleware } from './middleware/brute-force.middleware';
import { FailedLoginService } from './failed-login/failed-login.service';
import { WorkersProfileModule } from './workers-profile/workers-profile.module';
import { WorkersStatusModule } from './workers-status/workers-status.module';
import { WorkersStatusService } from './workers-status/workers-status.service';
import { KnowWorkService } from './know-work/know-work.service';
import { RecoverHolidaysWorkersService } from './recover-holidays-workers/recover-holidays-workers.service';
import { WorkersHolidaysService } from './workers-holidays/workers-holidays.service';
import { CronModule } from './cron/cron.module';


@Module({
  imports: [ MulterModule.register({ dest: './uploads' }) ,UsersModule, AuthModule, HolidaysModule, HolidaysCompanyModule, CompanyModule, CheckinsModule , CronModule , PrismaModule, DataCheckinsModule, CompanyWorkdayModule, MailerModule, ValidateUserModule, ResetPasswordModule , ScheduleModule.forRoot(), WorkersHolidaysModule, RecoverHolidaysWorkersModule, KnowWorkModule, CalendarGraphicDataModule, WorkersRequestModule, CompanyVacationsYearModule, WorkersHolidaysControlModule, UploadImgModule, ImagenModule, FailedLoginModule, WorkersProfileModule, WorkersStatusModule],
  controllers: [AppController, HolidaysController, HolidaysCompanyController, CompanyController , CheckinsController , DataCheckinsController, MailerController],
  providers: [AppService , PrismaService , HolidaysService, WorkersHolidaysService ,HolidaysCompanyService, RecoverHolidaysWorkersService ,CompanyService , CheckinsService , DataCheckinsService, KnowWorkService, MailerService , WorkersStatusService , CompanyWorkdayService ,FailedLoginService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BruteForceMiddleware)
      .forRoutes('auth');
  }
}
