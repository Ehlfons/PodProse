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





}
