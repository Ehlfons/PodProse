import { Module } from '@nestjs/common';
import { WorkersHolidaysService } from './workers-holidays.service';
import { WorkersHolidaysController } from './workers-holidays.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [WorkersHolidaysController],
  providers: [WorkersHolidaysService , PrismaService],
})
export class WorkersHolidaysModule {}
