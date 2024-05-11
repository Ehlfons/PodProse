import { Module } from '@nestjs/common';
import { CompanyFoldersService } from './company-folders.service';
import { CompanyFoldersController } from './company-folders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CompanyFilesModule } from 'src/company-files/company-files.module';

@Module({
  imports:[PrismaModule , CompanyFilesModule],
  controllers: [CompanyFoldersController],
  providers: [CompanyFoldersService],
})
export class CompanyFoldersModule {}
