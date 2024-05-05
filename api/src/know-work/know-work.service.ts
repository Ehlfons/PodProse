import { Injectable } from '@nestjs/common';
import { CompanyWorkdayService } from 'src/company-workday/company-workday.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecoverHolidaysWorkersService } from 'src/recover-holidays-workers/recover-holidays-workers.service';

@Injectable()
export class KnowWorkService {
    constructor( 
        private readonly prisma : PrismaService ,
        private readonly recoverData : RecoverHolidaysWorkersService ,
        private readonly companyWorkday : CompanyWorkdayService
    ){}

    async knowWorkByUserId(userId: string , date : Date) {
        const allUserHoliday = await this.recoverData.getAllHolidaysByUserId(userId);
        const today = new Date(date);
        const todayHoliday = allUserHoliday.find(holiday => {
            const holidayDate = new Date(holiday.date);
            return holidayDate.getFullYear() === today.getFullYear() &&
                holidayDate.getMonth() === today.getMonth() &&
                holidayDate.getDate() === today.getDate();
        });

        let status = 3;
    
        if (todayHoliday) {
            const { type } = todayHoliday;
            let text = "";

    
            if (type === "CompanyHoliday") {
                text = "Parece que tu empresa se está tomando hoy unas vacaciones...";
                status = 6;
                
            } else {
                text = "Parece que hoy estás de vacaciones, deberías ir al parque...";
                status = 4;
            }
    
            const result = { work: false, message: text , status:status};
            return result;
        } else {
            const companyWorkday = await this.companyWorkday.todayWorkday(userId);
            if (companyWorkday === "00:00") {
                let text = "Tu empresa hoy está descansando, tú deberías hacer lo mismo...";
                status = 6 ;
                const result = { work: false, message: text , status:status};
                return result;
            } else {
                status = 5 ;
                const result = { work: true, message: "A currar", status:status };
                return result;
            }
        }
    }
    
}
