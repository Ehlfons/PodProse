import { Module } from '@nestjs/common';
import { CompanyWorkdayService } from './company-workday.service';
import { CompanyWorkdayController } from './company-workday.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CompanyWorkdayController],
  providers: [CompanyWorkdayService , PrismaService],
  imports: [ PrismaModule]
})
export class CompanyWorkdayModule {}
