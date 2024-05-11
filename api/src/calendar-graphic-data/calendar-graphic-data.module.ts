import { Module } from '@nestjs/common';
import { CalendarGraphicDataService } from './calendar-graphic-data.service';
import { CalendarGraphicDataController } from './calendar-graphic-data.controller';
import { KnowWorkModule } from 'src/know-work/know-work.module';
import { CheckinsModule } from 'src/checkins/checkins.module';
import { CheckinsController } from 'src/checkins/checkins.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WorkersHolidaysModule } from 'src/workers-holidays/workers-holidays.module';
import { HolidaysCompanyModule } from 'src/company-holidays/company-holidays.module';

@Module({
  imports: [ PrismaModule , CheckinsModule , KnowWorkModule , WorkersHolidaysModule , HolidaysCompanyModule],
  controllers: [CalendarGraphicDataController , CheckinsController ],
  providers: [CalendarGraphicDataService],
  exports: [ CalendarGraphicDataService ] ,

})
export class CalendarGraphicDataModule {}
