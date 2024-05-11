import { Module } from '@nestjs/common';
import { HolidaysService } from './holidays.service';
import { HolidaysController } from './holidays.controller';
import { JwtModule} from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports: [JwtModule , PrismaModule],
  controllers: [HolidaysController],
  providers: [HolidaysService ] ,
  exports: [ HolidaysService]
})
export class HolidaysModule{}
