import { Module } from '@nestjs/common';
import { WorkersRequestService } from './workers-request.service';
import { WorkersRequestController } from './workers-request.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WorkersHolidaysModule } from 'src/workers-holidays/workers-holidays.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule,WorkersHolidaysModule,MailerModule , JwtModule],
  controllers: [WorkersRequestController],
  providers: [WorkersRequestService ],
  exports:[WorkersRequestService]
})
export class WorkersRequestModule {}
