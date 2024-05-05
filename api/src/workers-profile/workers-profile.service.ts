import { Injectable } from '@nestjs/common';
import { CompanyVacationsYearService } from 'src/company-vacations-year/company-vacations-year.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { WorkersHolidaysControlService } from 'src/workers-holidays-control/workers-holidays-control.service';
import { WorkersStatusService } from 'src/workers-status/workers-status.service';

@Injectable()
export class WorkersProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly companyVacations: CompanyVacationsYearService,
    private readonly workersHolidayControl: WorkersHolidaysControlService,
    private readonly workerStatus : WorkersStatusService
  ) {}

  async getProfileByUserId(userId: string) {
    //DATOS USUARIO
    const user = await this.prisma.user.findFirstOrThrow({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        DNI: true,
        url_img: true,
        company: true,
        companyWorkday:true,
      },
    });

    //DATOS VACACIONES
    const getYears = await this.companyVacations.findAllByCompanyId(
      user.company.id,
    );
    
    let vacationsUser = [];

    for (const element of getYears) {
      const vacationsResum = await this.workersHolidayControl.allDataVacationsByYear(
        element.year,
        user.id
      );
    
      const yearSummary = { year: element.year, ...vacationsResum };
      vacationsUser.push(yearSummary);
    }
    

    //ESTADO DEL TRABAJADOR
    const statusNumber = await this.workerStatus.knowStatus(userId);

    const status = { statusWorker: statusNumber };

    const data2Send = { user, vacationsUser, status };

    return data2Send;
  }
}
