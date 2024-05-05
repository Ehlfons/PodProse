import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [CompanyController],
    providers: [CompanyService , PrismaService],
    imports: [PrismaModule]
})
export class CompanyModule {}