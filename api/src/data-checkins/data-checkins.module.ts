import { Module } from '@nestjs/common';
import { DataCheckinsService } from './data-checkins.service';
import { DataCheckinsController } from './data-checkins.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [DataCheckinsController],
  providers: [DataCheckinsService , PrismaService],
  imports: [ PrismaModule]
})
export class DataCheckinsModule {}
