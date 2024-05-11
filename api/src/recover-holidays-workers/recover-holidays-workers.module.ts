import { Module } from '@nestjs/common';
import { RecoverHolidaysWorkersService } from './recover-holidays-workers.service';
import { RecoverHolidaysWorkersController } from './recover-holidays-workers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WorkersHolidaysModule } from 'src/workers-holidays/workers-holidays.module';
import { HolidaysCompanyModule } from 'src/company-holidays/company-holidays.module';
import { DataCheckinsModule } from 'src/data-checkins/data-checkins.module';

@Module({
  imports: [PrismaModule , WorkersHolidaysModule , HolidaysCompanyModule , DataCheckinsModule],
  controllers: [RecoverHolidaysWorkersController],
  providers: [RecoverHolidaysWorkersService ],
  exports: [ RecoverHolidaysWorkersService]
})
export class RecoverHolidaysWorkersModule {}