import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService , PrismaService , MailerService],
})
export class ResetPasswordModule {}
