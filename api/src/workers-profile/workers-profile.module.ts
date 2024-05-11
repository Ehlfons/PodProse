import { Module } from '@nestjs/common';
import { WorkersProfileService } from './workers-profile.service';
import { WorkersProfileController } from './workers-profile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CompanyVacationsYearModule } from 'src/company-vacations-year/company-vacations-year.module';
import { WorkersHolidaysControlModule } from 'src/workers-holidays-control/workers-holidays-control.module';
import { WorkersStatusModule } from 'src/workers-status/workers-status.module';

@Module({
  imports:[PrismaModule,CompanyVacationsYearModule,WorkersHolidaysControlModule,WorkersStatusModule],
  controllers: [WorkersProfileController],
  providers: [WorkersProfileService],
  exports:[WorkersProfileService]
})
export class WorkersProfileModule {}
