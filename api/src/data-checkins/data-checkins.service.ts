import { Injectable } from '@nestjs/common';
import { Data_Checkins_Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DataCheckinsService {

    constructor( 
        private prisma : PrismaService
    ){}

    //Utilizado en chekins.service.ts
    async addDataUser (   userId : string  , dataCheckIn  ){


        const user = await this.prisma.user.findFirstOrThrow({ where : { id : userId}});

        const addData = await this.prisma.data_Checkins_Users.create({
            data: dataCheckIn
        })

        return addData ;
    }

    async getDataUserByDate ( userId : string , startDate : Date , endDate : Date ) : Promise<Data_Checkins_Users[]>{

        const start = new Date(startDate);
        start.setHours(0,0,0,0);

        const end = new Date(endDate);
        end.setHours(23,59,59,59);


        const dataFind = await this.prisma.data_Checkins_Users.findMany({
            where: {
              userId: userId,
              date: {
                gte: start,
                lte: end
              },
            },
          });

          return dataFind;

    }

    async getTotalHours(userId: string, startDate: Date, endDate: Date) {
      const data = await this.getDataUserByDate(userId, startDate, endDate);
  
      let totalWorkedHours = 0;
      let totalWorkedMinutes = 0;
  
      let totalPrevisionHours = 0;
      let totalPrevisionMinutes = 0;
  
      data.forEach(day => {
          totalWorkedHours += parseInt(day.totalHoursWorked);
          totalWorkedMinutes += parseInt(day.totalMinutesWorked);
  
          totalPrevisionHours += parseInt(day.previsionTotalHours);
          totalPrevisionMinutes += parseInt(day.previsionTotalMinutes);
      });
  
      // Convertir minutos a horas y sumar a las horas totales trabajadas
      totalWorkedHours += Math.floor(totalWorkedMinutes / 60);
      totalWorkedMinutes %= 60;
  
      // Convertir minutos a horas y sumar a las horas totales de previsión
      totalPrevisionHours += Math.floor(totalPrevisionMinutes / 60);
      totalPrevisionMinutes %= 60;
  
      const result = {
          totalHoursWorked: totalWorkedHours,
          totalMinutesWorked: totalWorkedMinutes,
          totalHoursPrevision: totalPrevisionHours,
          totalMinutesPrevision: totalPrevisionMinutes
      };

      const moreData = await this.allOfProperties(result);
  
      return moreData;
  }

    async allOfProperties( result ){

      const {
        totalHoursWorked,
        totalMinutesWorked,
        totalHoursPrevision,
        totalMinutesPrevision
      } = result ;

      let differenceHours = totalHoursWorked - totalHoursPrevision ;
      let differenceMinutes = totalMinutesWorked - totalMinutesPrevision ;

      //Cuadrar horas con minutos
      if (differenceMinutes < 0) {
        differenceHours -= 1; // Resta una hora
        differenceMinutes += 60; // Suma 60 minutos
      }

      // Calcular el porcentaje de diferencia
      const totalMinutesWorkedAll = totalHoursWorked * 60 + totalMinutesWorked;
      const totalMinutesPrevisionAll = totalHoursPrevision * 60 + totalMinutesPrevision;
      let percentageDifference = ((totalMinutesWorkedAll - totalMinutesPrevisionAll) / totalMinutesPrevisionAll) * 100;

      //Valor absoluto
      percentageDifference = Number(Math.abs(percentageDifference).toFixed(2));

      //Saber el simbolo de si positivo o negativo , o anda en caso de cero
      let simbol = differenceHours > 0 ? "+" : differenceHours < 0 ? "-" : "" ;
      simbol = (simbol !== "=") ? simbol : (differenceMinutes > 0) ? "+" : (differenceMinutes < 0) ? "-" : "";

      //BalanceString
      let balanceString = (simbol === "-") ? "Debes currar más.." : (simbol === "+") ? "Te sobran horas.." : "Lo cuadraste REY";

      //Valor absoluto
      differenceHours = Math.abs(differenceHours);

      
    const result2 = {
      totalHoursWorked: totalHoursWorked,
      TotalMinutesWorked: totalMinutesWorked,
      TotalHoursPrevision: totalHoursPrevision,
      TotalMinutesPrevision: totalMinutesPrevision,
      DifferenceHours: differenceHours ,
      DifferenceMinutes: differenceMinutes,
      PercentageDifference: percentageDifference,
      Simbol: simbol,
      BalanceString: balanceString 
    };

      return result2;

    } 

    async getAllDateByUserId(userId : string){
      const allData = await this.prisma.data_Checkins_Users.findMany({
        where:{ userId}
      });
      return allData;
    }
  

  




















}
