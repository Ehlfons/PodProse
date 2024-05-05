import { Module } from '@nestjs/common';
import { WorkersProfileService } from './workers-profile.service';
import { WorkersProfileController } from './workers-profile.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyVacationsYearService } from 'src/company-vacations-year/company-vacations-year.service';
import { WorkersHolidaysControlService } from 'src/workers-holidays-control/workers-holidays-control.service';
import { WorkersHolidaysService } from 'src/workers-holidays/workers-holidays.service';
import { WorkersStatusService } from 'src/workers-status/workers-status.service';
import { KnowWorkService } from 'src/know-work/know-work.service';
import { RecoverHolidaysWorkersService } from 'src/recover-holidays-workers/recover-holidays-workers.service';
import { HolidaysCompanyService } from 'src/company-holidays/company-holidays.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { DataCheckinsService } from 'src/data-checkins/data-checkins.service';
import { CompanyWorkdayService } from 'src/company-workday/company-workday.service';

@Module({
  controllers: [WorkersProfileController],
  providers: [WorkersProfileService , PrismaService , WorkersHolidaysService, HolidaysCompanyService, JwtService , UsersService, DataCheckinsService, CompanyWorkdayService ,  CompanyVacationsYearService , WorkersHolidaysControlService ,RecoverHolidaysWorkersService ,WorkersStatusService , KnowWorkService],
})
export class WorkersProfileModule {}
