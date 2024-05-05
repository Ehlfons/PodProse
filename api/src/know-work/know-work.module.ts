import { Module } from '@nestjs/common';
import { KnowWorkService } from './know-work.service';
import { KnowWorkController } from './know-work.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecoverHolidaysWorkersService } from 'src/recover-holidays-workers/recover-holidays-workers.service';
import { CompanyWorkdayService } from 'src/company-workday/company-workday.service';
import { WorkersHolidaysService } from 'src/workers-holidays/workers-holidays.service';
import { HolidaysCompanyService } from 'src/company-holidays/company-holidays.service';
import { DataCheckinsService } from 'src/data-checkins/data-checkins.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RecoverHolidaysWorkersModule } from 'src/recover-holidays-workers/recover-holidays-workers.module';
import { CheckinsModule } from 'src/checkins/checkins.module';

@Module({
  imports: [ RecoverHolidaysWorkersModule , KnowWorkModule],
  controllers: [KnowWorkController],
  providers: [KnowWorkService , PrismaService , RecoverHolidaysWorkersService , CompanyWorkdayService , WorkersHolidaysService , HolidaysCompanyService , DataCheckinsService , JwtService , UsersService],
  exports: [KnowWorkModule]
})
export class KnowWorkModule {}
