import { Module } from '@nestjs/common';
import { HolidaysCompanyController } from './company-holidays.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { HolidaysCompanyService } from './company-holidays.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [HolidaysCompanyController],
    providers: [
        UsersService,
        PrismaService,
        HolidaysCompanyService,
        JwtService
    ],
    imports: [ JwtModule , PrismaModule] ,
    exports: [HolidaysCompanyService]
})
export class HolidaysCompanyModule {}
