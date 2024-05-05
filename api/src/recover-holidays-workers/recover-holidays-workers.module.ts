import { Module } from '@nestjs/common';
import { RecoverHolidaysWorkersService } from './recover-holidays-workers.service';
import { RecoverHolidaysWorkersController } from './recover-holidays-workers.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { WorkersHolidaysService } from 'src/workers-holidays/workers-holidays.service';
import { HolidaysCompanyService } from 'src/company-holidays/company-holidays.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { DataCheckinsService } from 'src/data-checkins/data-checkins.service';

@Module({
  controllers: [RecoverHolidaysWorkersController],
  providers: [RecoverHolidaysWorkersService , WorkersHolidaysService, PrismaService , WorkersHolidaysService , HolidaysCompanyService , JwtService , UsersService, DataCheckinsService ],
})
export class RecoverHolidaysWorkersModule {}