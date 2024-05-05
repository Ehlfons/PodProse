import { Module } from '@nestjs/common';
import { WorkersRequestService } from './workers-request.service';
import { WorkersRequestController } from './workers-request.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { WorkersHolidaysService } from 'src/workers-holidays/workers-holidays.service';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  controllers: [WorkersRequestController],
  providers: [WorkersRequestService , PrismaService , WorkersHolidaysService , MailerService],
})
export class WorkersRequestModule {}
