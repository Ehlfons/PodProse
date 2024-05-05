import { Module } from '@nestjs/common';
import { FailedLoginService } from './failed-login.service';
import { FailedLoginController } from './failed-login.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FailedLoginController],
  providers: [FailedLoginService , PrismaService],
  exports: [ FailedLoginModule , FailedLoginService]
})
export class FailedLoginModule {}
