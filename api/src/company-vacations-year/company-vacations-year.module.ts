import { Module } from '@nestjs/common';
import { CompanyVacationsYearService } from './company-vacations-year.service';
import { CompanyVacationsYearController } from './company-vacations-year.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CompanyVacationsYearController],
  providers: [CompanyVacationsYearService , PrismaService],
})
export class CompanyVacationsYearModule {}
