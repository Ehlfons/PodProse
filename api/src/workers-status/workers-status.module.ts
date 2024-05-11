import { forwardRef , Module } from '@nestjs/common';
import { WorkersStatusService } from './workers-status.service';
import { WorkersStatusController } from './workers-status.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { KnowWorkModule } from 'src/know-work/know-work.module';
import { CheckinsModule } from 'src/checkins/checkins.module';
import { DataCheckinsModule } from 'src/data-checkins/data-checkins.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule, KnowWorkModule ,JwtModule ],
  controllers: [WorkersStatusController],
  providers: [WorkersStatusService ],
  exports:[WorkersStatusService]
})
export class WorkersStatusModule {}
