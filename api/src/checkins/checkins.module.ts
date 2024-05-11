import { forwardRef , Module } from '@nestjs/common';
import { CheckinsController } from './checkins.controller';
import { CheckinsService } from './checkins.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DataCheckinsModule } from 'src/data-checkins/data-checkins.module';
import { WorkersStatusModule } from 'src/workers-status/workers-status.module';
import { CompanyWorkdayModule } from 'src/company-workday/company-workday.module';

@Module({
  imports: [PrismaModule ,  WorkersStatusModule , DataCheckinsModule , CompanyWorkdayModule],
  controllers: [CheckinsController],
  providers: [CheckinsService]  ,
  exports: [ CheckinsService]
})
export class CheckinsModule {}
