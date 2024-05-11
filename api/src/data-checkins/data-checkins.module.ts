import { Module } from '@nestjs/common';
import { DataCheckinsService } from './data-checkins.service';
import { DataCheckinsController } from './data-checkins.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ PrismaModule ],
  controllers: [DataCheckinsController],
  providers: [DataCheckinsService ],
  exports: [ DataCheckinsService]

})
export class DataCheckinsModule {}
