import { Injectable } from '@nestjs/common';
import { CheckinsService } from 'src/checkins/checkins.service';
import { CompanyWorkdayService } from 'src/company-workday/company-workday.service';
import { DataCheckinsModule } from 'src/data-checkins/data-checkins.module';
import { DataCheckinsService } from 'src/data-checkins/data-checkins.service';
import { KnowWorkService } from 'src/know-work/know-work.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { WorkersStatusService } from 'src/workers-status/workers-status.service';

@Injectable()
export class CompanyStatusWorkersService {

    constructor(
        private readonly prisma : PrismaService , 
        private readonly checkins : CheckinsService,
        private readonly dataCheckins : DataCheckinsService,
        private readonly knowWork : KnowWorkService,
        private readonly status : WorkersStatusService,
        private readonly companyWorkday : CompanyWorkdayService
    ){}




  //==========================================
   //Resumen status
  //==========================================

  async getStatusByCompanyIdAndDate(companyId: string, date: Date) {

    const today = new Date();
    today.setHours(15, 0, 0, 0);
    console.log(today);
    
    const datePass = new Date(date);
    datePass.setHours(15, 0, 0, 0);
    console.log(datePass);

    let isToday = false ;
    let isFuture = false ;

    if( today.getDay() === datePass.getDay()){
      isToday = true ;
    } else if (datePass.getTime() > today.getTime() ){
      isFuture = true ;
    }
    
    
    console.log(`Today es ${isToday} y futuro es ${isFuture}`);
    
    
    let data2send = [];

    const users = await this.prisma.user.findMany({ where: { companyId } });

    for (const user of users) {
        console.log(user.name);

        let scheduledhHours ;
        let timeDayStarted ;
        let timeEndStarted ;
        let timeWorked ;
        let status ;

        let dataUser;

      if (isToday) {



        let chekinsData = await this.checkins.calculateByDate(user.id, date); 
        let statusWoker = await this.status.knowStatus(user.id);
        status = statusWoker.status;

        if( status === 4 || status === 6){
          scheduledhHours = "00:00" ;
          timeDayStarted = "00:00" ;
          timeEndStarted = "00:00" ;
        }else{
          scheduledhHours = await this.companyWorkday.todayWorkday(user.id);
          timeDayStarted = chekinsData.timeDayStarted ? chekinsData.timeDayStarted : 'Esperando...';
          timeEndStarted = !chekinsData.timeDayStarted ? 'No ha empezado...' : chekinsData.timeEndStarted ? chekinsData.timeEndStarted : 'Aún no ha terminado...' ;
        }

        dataUser = {
          userId: user.id,
          name: user.name,
          scheduledhHours: scheduledhHours ,
          timeDayStarted: timeDayStarted ,
          timeEndStarted: timeEndStarted,
          timeWorked: chekinsData.timeWorked ? chekinsData.timeWorked : 'Not Data Found' ,
          statusWorked: status
        };


      
        
      }else if ( isFuture){

        let statusWoker = await this.knowWorkdDate(user.id,date);
        status = statusWoker.status;

        //Horas x defecto es futuro no se ha trabajado
        timeDayStarted = "00:00" ;
        timeEndStarted = "00:00" ;
        timeWorked = "00:00" ;

        if( status === 4 || status === 6){
          scheduledhHours = "00:00" ;
        }else{
          scheduledhHours = await this.companyWorkday.todayWorkday(user.id,date);
        }


        dataUser = {
          userId: user.id,
          name: user.name,
          scheduledhHours: scheduledhHours ,
          timeDayStarted: timeDayStarted ,
          timeEndStarted: timeEndStarted,
          timeWorked: timeWorked ,
          statusWorked: status
        };

      }else {

        let statusWorker = await this.knowWorkdDate(user.id,date);
        status =  statusWorker.status ;

        if( status === 4 || status === 6){
          scheduledhHours = "00:00" ;
          timeDayStarted = "00:00" ;
          timeEndStarted = "00:00" ;
          timeWorked = "00:00" ;
        }else{
          let dataResum = await this.dataCheckins.getTotalHours(user.id,date,date);
          let chekinsData = await this.checkins.calculateByDate(user.id, date);


          if( dataResum.TotalMinutesWorked === 0 && dataResum.totalHoursWorked === 0 ){

            scheduledhHours = `????` ;
            timeDayStarted = "00:00" ;
            timeEndStarted = "00:00" ;
            timeWorked = "00:00" ;
            status = 7 ;

          }else {
            let timeHours = dataResum.TotalHoursPrevision < 10 ? `0${dataResum.TotalHoursPrevision}` : `${dataResum.TotalHoursPrevision}`;
            let timeMinutes = dataResum.TotalMinutesPrevision < 10 ? `0${dataResum.TotalMinutesPrevision}` : `${dataResum.TotalMinutesPrevision}`;
  
            scheduledhHours = `${timeHours}:${timeMinutes}` ;
            timeDayStarted = chekinsData.timeDayStarted ;
            timeEndStarted = chekinsData.timeEndStarted  ;
            timeWorked = chekinsData.timeWorked;
  
          }
        }

        dataUser = {
          userId: user.id,
          name: user.name,
          scheduledhHours: scheduledhHours ,
          timeDayStarted: timeDayStarted ,
          timeEndStarted: timeEndStarted,
          timeWorked: timeWorked ,
          statusWorked: status
        };


      }

      data2send.push(dataUser)

    }
    return data2send;
  }


  async knowWorkdDate(userId : string , date : Date){
    return await this.knowWork.knowWorkByUserId(userId,date);
  }





}
