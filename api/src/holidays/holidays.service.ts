import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HolidaysService {

    constructor(
        private  prisma: PrismaService,
      ) {}

    async getProvince(){
        const provinces = await this.prisma.holidays.findMany({
            select:{
                province: true,
            },
            distinct:['province'],
            orderBy:{
                province: 'asc'
            },

        });

        return provinces.map((holiday) => holiday.province);
    }

    async getLocalities(province: string) {
        const localities = await this.prisma.holidays.findMany({
          select: {
            locality: true,
          },
          distinct: ['locality'],
          where: {
            province: province,
          },
          orderBy: {
            locality: 'asc',
          },
        });
    
        return localities.map((locality) => locality.locality);
    }

    async getHolidays(withNationals: string, locality: string, province: string) {
        
        let holidays = [];
    
        if (withNationals == "true" ) {
          const nationals = await this.prisma.holidays.findMany({
            where: {
              type: 'Nacional',
            },
            select: {
              date: true,
              type: true,
              description: true,
            },
          });
          holidays = [...holidays, ...nationals];
        };
    
        if (locality != "") {
          const localityHolidays = await this.prisma.holidays.findMany({
            where: {
              locality: locality,
            },
            select: {
              date: true,
              type: true,
              description: true,
            },
          });
          holidays = [...holidays, ...localityHolidays];
        };
    
        if (province !="") {
          const provinceHolidays = await this.prisma.holidays.findMany({
            where: {
              province: province,
              type: 'Autonómico',
            },
            select: {
              date: true,
              type: true,
              description: true,
            },
          });
          holidays = [...holidays, ...provinceHolidays];
        };
        
        holidays.sort( (a , b) => a.date - b.date );

        return holidays;
      }






}
