import { Module } from '@nestjs/common';
import { WorkersStatusService } from './workers-status.service';
import { WorkersStatusController } from './workers-status.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { KnowWorkService } from 'src/know-work/know-work.service';
import { RecoverHolidaysWorkersService } from 'src/recover-holidays-workers/recover-holidays-workers.service';
import { CompanyWorkdayService } from 'src/company-workday/company-workday.service';
import { DataCheckinsService } from 'src/data-checkins/data-checkins.service';
import { HolidaysCompanyService } from 'src/company-holidays/company-holidays.service';
import { WorkersHolidaysService } from 'src/workers-holidays/workers-holidays.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [WorkersStatusController],
  providers: [WorkersStatusService , PrismaService , KnowWorkService , RecoverHolidaysWorkersService , CompanyWorkdayService , DataCheckinsService , HolidaysCompanyService , WorkersHolidaysService , JwtService , UsersService ],
})
export class WorkersStatusModule {}
