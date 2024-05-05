import { Controller, Post, Body, Request  , InternalServerErrorException, Get, UseGuards} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Request as ExpressRequest } from 'express'; // Importa Request de Express
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { HolidaysCompanyService } from './company-holidays.service';

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

    const user = await this.holcomService.getUserByToken(req);
    console.log(user);

    const companyId = user.companyId;
    const days = req.body.days;

    const daysCompany = await this.holcomService.addHolidaysToCompanyById(days , companyId);

    return daysCompany;
  }

  @Get('get-days')
  // @UseGuards(AuthGuard)
  async getHolidaysCompany(@Request() req: ExpressRequest)  {

      const user = await this.holcomService.getUserByToken(req);
      console.log(user);
  
      const companyId = user.companyId;
        
        const holidaysCompanyFound = await this.holcomService.getHolidaysCompany(companyId);

        return holidaysCompanyFound;

          }catch (error) {
        console.error('Problemas', error);
        throw new InternalServerErrorException('Problemitas menores');
      }
  }





