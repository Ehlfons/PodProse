import { Controller, Get , Param , Query, UseGuards} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HolidaysService } from './holidays.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { AuthAdminGuard } from 'src/auth/guard/authAdmin.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Festivos Para Empresas || Recuperar provincias y localidades')
@Controller('holidays')
export class HolidaysController {
    constructor(
        private readonly prisma : PrismaService ,
        private readonly holidaysService : HolidaysService
    ) {}

    @Get('provinces')
    @UseGuards(AuthAdminGuard)
    async getProvincias() {
        return this.holidaysService.getProvince();
    }

    
    @Get(':province/localities')
    async getLocalidades(@Param('province') province: string) {
      return this.holidaysService.getLocalities(province);
    }

    //@UseGuards(AuthGuard)
    @Get('days')
    async getHolidays(
      @Query('withNationals') withNationals: string,
      @Query('locality') locality: string,
      @Query('province') province: string,
    ) {

      return this.holidaysService.getHolidays(withNationals, locality, province);
    }

}
