import { Module } from '@nestjs/common';
import { CheckinsController } from './checkins.controller';
import { CheckinsService } from './checkins.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DataCheckinsService } from 'src/data-checkins/data-checkins.service';
import { DataCheckinsModule } from 'src/data-checkins/data-checkins.module';
import { CompanyWorkdayService } from 'src/company-workday/company-workday.service';
import { WorkersStatusService } from 'src/workers-status/workers-status.service';
import { KnowWorkService } from 'src/know-work/know-work.service';
import { RecoverHolidaysWorkersService } from 'src/recover-holidays-workers/recover-holidays-workers.service';
import { WorkersHolidaysService } from 'src/workers-holidays/workers-holidays.service';
import { HolidaysCompanyService } from 'src/company-holidays/company-holidays.service';
import { WorkersStatusModule } from 'src/workers-status/workers-status.module';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [CheckinsController],
  providers: [CheckinsService , PrismaService , DataCheckinsService , CompanyWorkdayService , WorkersStatusService , KnowWorkService , RecoverHolidaysWorkersService , WorkersHolidaysService , HolidaysCompanyService ,JwtService , UsersService ]  ,
  imports: [PrismaModule , DataCheckinsModule , WorkersStatusModule],
  exports: [ CheckinsModule]
})
export class CheckinsModule {}
