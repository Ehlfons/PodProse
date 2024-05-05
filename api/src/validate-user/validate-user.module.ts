import { Module } from '@nestjs/common';
import { ValidateUserService } from './validate-user.service';
import { ValidateUserController } from './validate-user.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ValidateUserController],
  providers: [ValidateUserService , PrismaService],
})
export class ValidateUserModule {}
