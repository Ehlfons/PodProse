import { Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { Request as ExpressRequest } from 'express'; // Importa Request de Express
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CompanyHolidays } from '@prisma/client';



@Injectable()
export class HolidaysCompanyService {

    constructor(
        private prisma: PrismaService ,
        private jwtService : JwtService ,
        private usersService : UsersService   
    ){}

    async addHolidaysToCompanyById ( days , companyId : string ) {

    // Eliminar los festivos existentes de la empresa
    await this.prisma.companyHolidays.deleteMany({
        where: {
            companyId,
        },
    });

    //Formatear Fechar
    const daysCompanyFormatted = days.map((day) => ({
        companyId,
        date: day.date.includes('T') ? day.date : day.date + 'T00:00:00Z',
        type: day.type,
        description: day.description,
      }));

    //Add los datos a la bbdd 
      try {

        await this.prisma.companyHolidays.createMany({
            data: daysCompanyFormatted,
          })
        
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Problemitas con las fechas');
      }
    }

    async getHolidaysCompany(companyId :string  ) : Promise<CompanyHolidays[]>{

        try {

        const holidaysCompanyFound = await this.prisma.companyHolidays.findMany({
            where: {
                companyId: companyId
            }
        });

        holidaysCompanyFound.sort((a, b) => a.date.getTime() - b.date.getTime());


        return holidaysCompanyFound;

            
        } catch (error) {
            console.error('Error obteniendo los datos del usuario:', error);
            throw new InternalServerErrorException('Internal server error occurred');
        }

    }








    async getUserByToken( req : ExpressRequest): Promise<User> {

    const token = req.headers.authorization.split(' ')[1]; // Obtiene el token del encabezado de autorización
    const decodedToken = this.jwtService.verify(token); // Decodifica el token JWT
    const userId = decodedToken.sub; // Obtiene el ID de usuario del token

    const user = await this.prisma.user.findFirstOrThrow({where:{ id : userId}});
    return user;

    }











}
