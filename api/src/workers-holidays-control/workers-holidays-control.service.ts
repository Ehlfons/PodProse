import { Injectable } from '@nestjs/common';
import { CompanyVacationsYearService } from 'src/company-vacations-year/company-vacations-year.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { WorkersHolidaysService } from 'src/workers-holidays/workers-holidays.service';

@Injectable()
export class WorkersHolidaysControlService {
    constructor( 
        private readonly prisma : PrismaService , 
        private readonly companyVacations : CompanyVacationsYearService, 
        private readonly workersVacations : WorkersHolidaysService
    ){}

    async spendDaysVacationsByYear(year : string , userId : string){

        const daysVacations = await this.workersVacations.getHolidaysByUserId(userId);

        const daysVacationsOfYear = daysVacations.filter(vacation => vacation.date.getFullYear().toString() === year).length;

        return daysVacationsOfYear;
    }

    async availableDaysVacationsByYear(year : string , userId : string){

        const user = await this.prisma.user.findFirstOrThrow({where : { id : userId}});
        const daysVacationsTotalsCompany = await this.companyVacations.findOneByCompanyIdYear(user.companyId , year);

        return daysVacationsTotalsCompany;

    }

    async calculateVacatiosByYear(year : string , userId : string){
        const daysSpend = await this.spendDaysVacationsByYear(year , userId);
        const availableCompanyDays = await this.availableDaysVacationsByYear(year,userId);

        const resultDays = availableCompanyDays - daysSpend;
        return resultDays;

    }

    async allDataVacationsByYear(year : string , userId : string){
        return  {
            spendDays: await this.spendDaysVacationsByYear(year , userId) ,
            availableCompanyDays: await this.availableDaysVacationsByYear(year,userId) ,
            availableUserDays: await this.calculateVacatiosByYear(year,userId)
        }
    }



    async preCalculateDate(  year : string , userId : string , startDate : Date , endData : Date){

        const dataVacations = await this.allDataVacationsByYear(year , userId);

        const start = new Date(startDate);
        const end = new Date (endData);

        const daysVacations = this.returnDaysTwoDates(start,end);

        const data2send = { 
            year: year ,
            daysRequest : daysVacations ,
            newSpendDays : dataVacations.spendDays + daysVacations ,
            newAvailableUserDays :  dataVacations.availableUserDays - daysVacations ,
        }

        return data2send;

    }

    esEntreSemana(fecha: Date): boolean {
        const dia = fecha.getDay();
        return dia >= 1 && dia <= 5; 
    }

    returnDaysTwoDates(fechaInicio: Date, fechaFin: Date): number {
        let contador = 0;
        let fechaActual = new Date(fechaInicio); 
        
        while (fechaActual <= fechaFin) {
            if (this.esEntreSemana(fechaActual)) {
                contador++;
            }
            fechaActual.setDate(fechaActual.getDate() + 1);
        }
        
        return contador;
    }
    
    
    




}
