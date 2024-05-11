import { Controller, Post, Body, Request  , InternalServerErrorException, Get, UseGuards, Param} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Request as ExpressRequest } from 'express'; // Importa Request de Express
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { HolidaysCompanyService } from './company-holidays.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Festivos de la Company')
@Controller('holidays-company')
export class HolidaysCompanyController {
  constructor(
    private readonly prisma: PrismaService ,
    private readonly jwtService : JwtService,
    private readonly usersService : UsersService,
    private readonly holcomService : HolidaysCompanyService
    ) {}

  @Post('add-days')
  // @UseGuards(AuthGuard)
  async addHolidaysCompany(@Request() req: ExpressRequest)  {

    const companyId = req.body.companyId;
    const days = req.body.days;

    const daysCompany = await this.holcomService.addHolidaysToCompanyById(days , companyId);

    return daysCompany;
  }

  @Get('get-days/:companyId')
  // @UseGuards(AuthGuard)
  async getHolidaysCompany(@Param('companyId') companyId : string )  {

        const holidaysCompanyFound = await this.holcomService.getHolidaysCompany(companyId);

        return holidaysCompanyFound;

          }catch (error) {
        console.error('Problemas', error);
        throw new InternalServerErrorException('Problemitas menores');
      }
  }





