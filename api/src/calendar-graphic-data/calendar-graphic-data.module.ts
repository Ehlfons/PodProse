import { Module } from '@nestjs/common';
import { CalendarGraphicDataService } from './calendar-graphic-data.service';
import { CalendarGraphicDataController } from './calendar-graphic-data.controller';
import { KnowWorkModule } from 'src/know-work/know-work.module';
import { CheckinsModule } from 'src/checkins/checkins.module';
import { CheckinsController } from 'src/checkins/checkins.controller';
import { CheckinsService } from 'src/checkins/checkins.service';
import { KnowWorkService } from 'src/know-work/know-work.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DataCheckinsModule } from 'src/data-checkins/data-checkins.module';
import { DataCheckinsService } from 'src/data-checkins/data-checkins.service';
import { CompanyWorkdayService } from 'src/company-workday/company-workday.service';
import { RecoverHolidaysWorkersService } from 'src/recover-holidays-workers/recover-holidays-workers.service';
import { WorkersHolidaysService } from 'src/workers-holidays/workers-holidays.service';
import { HolidaysCompanyService } from 'src/company-holidays/company-holidays.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { WorkersStatusService } from 'src/workers-status/workers-status.service';

@Module({
  controllers: [CalendarGraphicDataController , CheckinsController ],
  providers: [CalendarGraphicDataService , CheckinsService , KnowWorkService , DataCheckinsService , CompanyWorkdayService , WorkersStatusService ,RecoverHolidaysWorkersService , WorkersHolidaysService , HolidaysCompanyService , JwtService , UsersService , WorkersHolidaysService],
  exports: [ CalendarGraphicDataModule] ,
  imports: [ PrismaModule , CheckinsModule , DataCheckinsModule]
})
export class CalendarGraphicDataModule {}
