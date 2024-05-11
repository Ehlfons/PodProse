import { Module } from '@nestjs/common';
import { WorkersHolidaysService } from './workers-holidays.service';
import { WorkersHolidaysController } from './workers-holidays.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [WorkersHolidaysController ],
  providers: [WorkersHolidaysService ],
  exports: [ WorkersHolidaysService]
})
export class WorkersHolidaysModule {}
