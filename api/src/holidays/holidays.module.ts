import { Module } from '@nestjs/common';
import { HolidaysService } from './holidays.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { HolidaysController } from './holidays.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  controllers: [HolidaysController],
  providers: [HolidaysService , PrismaService , JwtService] ,
  imports: [JwtModule , PrismaModule],
  exports: [ JwtModule]
})
export class HolidaysModule{}
