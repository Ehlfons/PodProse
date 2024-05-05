import { Injectable } from '@nestjs/common';
import { WorkersHolidays } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkersHolidaysService {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async getHolidaysByUserId(userId : string ) : Promise<WorkersHolidays[]>{

        const userHolidays = await this.prisma.workersHolidays.findMany({
            where: { userId}
        });

        return userHolidays;
    }
    async addHolidayByUserId(userId : string , date : Date , description: string ) {

        const addHoliday = await this.prisma.workersHolidays.create({
            data : {
                userId:userId,
                date : new Date(date),
                description: description
            }
        });

        return addHoliday;
    }



}
