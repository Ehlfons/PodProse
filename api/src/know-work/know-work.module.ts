import { Module } from '@nestjs/common';
import { KnowWorkService } from './know-work.service';
import { KnowWorkController } from './know-work.controller';
import { RecoverHolidaysWorkersModule } from 'src/recover-holidays-workers/recover-holidays-workers.module';
import { CompanyWorkdayModule } from 'src/company-workday/company-workday.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ PrismaModule, RecoverHolidaysWorkersModule , CompanyWorkdayModule ],
  controllers: [KnowWorkController],
  providers: [KnowWorkService ],
  exports: [KnowWorkService]
})
export class KnowWorkModule {}
