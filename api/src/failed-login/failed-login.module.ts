import { Module } from '@nestjs/common';
import { FailedLoginService } from './failed-login.service';
import { FailedLoginController } from './failed-login.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FailedLoginController],
  providers: [FailedLoginService],
  exports: [FailedLoginService, PrismaModule],
})
export class FailedLoginModule {}
