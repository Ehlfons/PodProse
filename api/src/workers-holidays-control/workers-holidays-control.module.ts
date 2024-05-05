import { Module } from '@nestjs/common';
import { WorkersHolidaysControlService } from './workers-holidays-control.service';
import { WorkersHolidaysControlController } from './workers-holidays-control.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyVacationsYearService } from 'src/company-vacations-year/company-vacations-year.service';
import { WorkersHolidaysService } from 'src/workers-holidays/workers-holidays.service';

@Module({
  controllers: [WorkersHolidaysControlController],
  providers: [WorkersHolidaysControlService , PrismaService , CompanyVacationsYearService , WorkersHolidaysService],
})
export class WorkersHolidaysControlModule {}
