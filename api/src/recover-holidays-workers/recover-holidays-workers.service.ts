import { Injectable } from '@nestjs/common';
import { HolidaysCompanyService } from 'src/company-holidays/company-holidays.service';
import { DataCheckinsService } from 'src/data-checkins/data-checkins.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { WorkersHolidaysService } from 'src/workers-holidays/workers-holidays.service';

@Injectable()
export class RecoverHolidaysWorkersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly workersHolidays: WorkersHolidaysService,
    private readonly companyHolidays: HolidaysCompanyService,
    private readonly dataCheckinsService: DataCheckinsService,
  ) {}

  async getAllDataByUserId(userId: string) {

    const allUserHoliday = await this.getAllHolidaysByUserId(userId);
    const checkinsUserFormat = await this.getCheckinsByUserIdFormat(userId);
    
    const allHolidays = allUserHoliday.concat(checkinsUserFormat);
    
    return allHolidays;
  }

  async getHolidaysUserByIdFormat(userId: string){
    const holidaysUser = await this.workersHolidays.getHolidaysByUserId(userId);
    const holidaysUserFormat = holidaysUser.map((day) => ({
      date: day.date,
      type: "Holiday",
      description: day.description,
    }));
    return holidaysUserFormat
  }

  async getHolidaysCompanyByUserIdFormat(userId: string){
    const user = await this.prisma.user.findFirstOrThrow({
      where: { id: userId },
    });
    const holidaysCompany = await this.companyHolidays.getHolidaysCompany(user.companyId,);
    const holidaysCompanyFormat = holidaysCompany.map((day) => ({
      date: day.date,
      type: "CompanyHoliday",
      description: day.description,
    }));

    return holidaysCompanyFormat;

  }

  async getCheckinsByUserIdFormat(userId: string){
    const checkinsUser = await this.dataCheckinsService.getAllDateByUserId(userId);
    const checkinsUserFormat = checkinsUser.map((day) => ({
      date: day.date,
      type: "Worked",
      description: "Worked",
    }));
    return checkinsUserFormat
  }

  async getAllHolidaysByUserId(userId: string){

    const holidaysCompanyFormat = await this.getHolidaysCompanyByUserIdFormat(userId);
    const holidaysUserFormat = await this.getHolidaysUserByIdFormat(userId);

    const allUserHolidays = holidaysCompanyFormat.concat(holidaysUserFormat);

    return allUserHolidays;

  }


}
