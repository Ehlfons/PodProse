import { Module } from '@nestjs/common';
import { CompanyWorkdayService } from './company-workday.service';
import { CompanyWorkdayController } from './company-workday.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ PrismaModule],
  controllers: [CompanyWorkdayController],
  providers: [CompanyWorkdayService ],
  exports: [ CompanyWorkdayService]
  
})
export class CompanyWorkdayModule {}
