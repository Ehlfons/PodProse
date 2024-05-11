import { Injectable } from '@nestjs/common';
import { CheckinsController } from 'src/checkins/checkins.controller';
import { CheckinsService } from 'src/checkins/checkins.service';
import { HolidaysCompanyService } from 'src/company-holidays/company-holidays.service';
import { KnowWorkService } from 'src/know-work/know-work.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { WorkersHolidaysService } from 'src/workers-holidays/workers-holidays.service';


@Injectable()
export class CalendarGraphicDataService {

  constructor(
    private readonly checkins : CheckinsService ,
    private readonly knowWork : KnowWorkService ,
    private readonly workersHolidaysService: WorkersHolidaysService,
    private readonly companyHoliday : HolidaysCompanyService ,
    private readonly prisma : PrismaService
  ){}

  async findDayByDateAndUserId(date: Date, userId: string) {
    const timeLineData = await this.checkins.calculateByDate(userId, date);
    const knowWork = await this.knowWork.knowWorkByUserId(userId,date);
    const diasVacaciones = await this.workersHolidaysService.getHolidaysByUserId(userId);

    const user = await this.prisma.user.findFirstOrThrow({where : { id : userId}});

    const diasVacacionesEmpresa = await this.companyHoliday.getHolidaysCompany(user.companyId);

    if (timeLineData.dayStarted) {
      const response = {
        mode: "worked",
      };
      return response;
    } else if ( this.checkIfDateIsHoliday(date,diasVacaciones)) {
      
      const response = {
        mode: "Vacations",
        resum: "Vacaciones , Vacaciones , Vacaciones , Vacaciones todo el día de Vacaciones"
      };
      return response;
    // }else if( this.checkIfDateIsHoliday(date,diasVacacionesEmpresa)){ 
    //   const response = {
    //     mode: "Vacations",
    //     resum: this.returnHolidayMessage(date,diasVacacionesEmpresa)
    //   };
    //   return response;
    }else {
      const response = {
        mode: "freeDay",
        resum: "No tenemos registros para el día seleccionado"
      };
      return response;
    }
  }

  checkIfDateIsHoliday(dateToCheck, holidaysArray) {
    // Convertir la fecha a un formato comparable
    //Restar un dia para que cuadre?¿?¿?
    const  dateToCheckReset = new Date(dateToCheck);
    dateToCheckReset.setDate(dateToCheckReset.getDate() + 1);

    const formattedDateToCheck = new Date(dateToCheckReset).toISOString().split("T")[0];
    //console.log(formattedDateToCheck);

    // Iterar sobre el array de vacaciones
    for (const holiday of holidaysArray) {
      //console.log(holiday);
        const formattedHolidayDate = holiday.date.toISOString().split("T")[0];

        // Comparar las fechas
        //console.log(`Dia que es ${formattedDateToCheck} dia comprobado ${formattedHolidayDate}\n`);
        if (formattedDateToCheck === formattedHolidayDate) {
            // La fecha está en el array de vacaciones
            return true;
        }
    }
    // La fecha no está en el array de vacaciones
    return false;
  }



  // returnHolidayMessage(dateToCheck, holidaysArray) {

  //   const  dateToCheckReset = new Date(dateToCheck);
  //   dateToCheckReset.setDate(dateToCheckReset.getDate() + 1);

  //   const formattedDateToCheck = new Date(dateToCheckReset).toISOString().split("T")[0];

  //   for (const holiday of holidaysArray) {
  //       const formattedHolidayDate = holiday.date.toISOString().split("T")[0];
  //       if (formattedDateToCheck === formattedHolidayDate) {
            
  //           return holiday.description ;
  //       }
  //   }
  //   // La fecha no está en el array de vacaciones
  //   return "No se que dia es hoy..";
  // }


}
