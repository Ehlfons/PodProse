import { Module } from '@nestjs/common';
import { CompanyStatusWorkersService } from './company-status-workers.service';
import { CompanyStatusWorkersController } from './company-status-workers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CheckinsModule } from 'src/checkins/checkins.module';
import { DataCheckinsModule } from 'src/data-checkins/data-checkins.module';
import { KnowWorkModule } from 'src/know-work/know-work.module';
import { WorkersStatusModule } from 'src/workers-status/workers-status.module';
import { CompanyWorkdayModule } from 'src/company-workday/company-workday.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule , CheckinsModule , DataCheckinsModule , KnowWorkModule , CompanyWorkdayModule  ,WorkersStatusModule , JwtModule],
  controllers: [CompanyStatusWorkersController],
  providers: [CompanyStatusWorkersService],
})
export class CompanyStatusWorkersModule {}
