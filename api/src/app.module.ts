import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HolidaysModule } from './holidays/holidays.module';
import { HolidaysCompanyModule } from './company-holidays/company-holidays.module';
import { CompanyModule } from './company/company.module';
import { CheckinsModule } from './checkins/checkins.module';
import { PrismaModule } from './prisma/prisma.module';
import { DataCheckinsModule } from './data-checkins/data-checkins.module';
import { CompanyWorkdayModule } from './company-workday/company-workday.module';
import { MailerModule } from './mailer/mailer.module';
import { ValidateUserModule } from './validate-user/validate-user.module';
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
import { WorkersProfileModule } from './workers-profile/workers-profile.module';
import { WorkersStatusModule } from './workers-status/workers-status.module';
import { CronModule } from './cron/cron.module';
import { CompanyFoldersModule } from './company-folders/company-folders.module';
import { CompanyFilesModule } from './company-files/company-files.module';
import { FilesUsersModule } from './files-users/files-users.module';
import { DocsModule } from './docs/docs.module';
import { CompanyStatusWorkersModule } from './company-status-workers/company-status-workers.module';


@Module({
  imports: [ 
    MulterModule.register({ dest: './uploads' }) , CheckinsModule , UsersModule, AuthModule, HolidaysModule, HolidaysCompanyModule, CompanyModule, CheckinsModule , CronModule , PrismaModule, DataCheckinsModule, CompanyWorkdayModule, MailerModule, ValidateUserModule, ResetPasswordModule , ScheduleModule.forRoot(), WorkersHolidaysModule, RecoverHolidaysWorkersModule, KnowWorkModule, CalendarGraphicDataModule, WorkersRequestModule, CompanyVacationsYearModule, WorkersHolidaysControlModule, UploadImgModule, ImagenModule, FailedLoginModule, WorkersProfileModule, WorkersStatusModule, CompanyFoldersModule, CompanyFilesModule, FilesUsersModule, DocsModule, CompanyStatusWorkersModule],
  controllers: [AppController],
  providers: [AppService] ,
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BruteForceMiddleware)
      .forRoutes('auth/login');
  }
}
