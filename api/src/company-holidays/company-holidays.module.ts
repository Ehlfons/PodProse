import { Module } from '@nestjs/common';
import { HolidaysCompanyController } from './company-holidays.controller';
import { HolidaysCompanyService } from './company-holidays.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [ JwtModule , PrismaModule , UsersModule] ,
    controllers: [HolidaysCompanyController],
    providers: [HolidaysCompanyService ],
    exports: [HolidaysCompanyService]
})
export class HolidaysCompanyModule {}
