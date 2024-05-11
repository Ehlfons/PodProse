import { Module } from '@nestjs/common';
import { WorkersHolidaysControlService } from './workers-holidays-control.service';
import { WorkersHolidaysControlController } from './workers-holidays-control.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CompanyVacationsYearModule } from 'src/company-vacations-year/company-vacations-year.module';
import { WorkersHolidaysModule } from 'src/workers-holidays/workers-holidays.module';

@Module({
  imports:[PrismaModule , CompanyVacationsYearModule , WorkersHolidaysModule ],
  controllers: [WorkersHolidaysControlController],
  providers: [WorkersHolidaysControlService ],
  exports:[WorkersHolidaysControlService]
})
export class WorkersHolidaysControlModule {}
