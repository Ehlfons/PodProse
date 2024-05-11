import { Module } from '@nestjs/common';
import { CompanyVacationsYearService } from './company-vacations-year.service';
import { CompanyVacationsYearController } from './company-vacations-year.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [CompanyVacationsYearController],
  providers: [CompanyVacationsYearService ],
  exports:[CompanyVacationsYearService]
})
export class CompanyVacationsYearModule {}
