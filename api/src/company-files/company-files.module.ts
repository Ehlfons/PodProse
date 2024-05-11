import { Module } from '@nestjs/common';
import { CompanyFilesService } from './company-files.service';
import { CompanyFilesController } from './company-files.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [CompanyFilesController],
  providers: [CompanyFilesService],
  exports: [CompanyFilesService]
})
export class CompanyFilesModule {}
