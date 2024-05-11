import { Injectable } from '@nestjs/common';
import { CreateCompanyWorkdayDto } from './dto/create-company-workday.dto';
import { UpdateCompanyWorkdayDto } from './dto/update-company-workday.dto';
import { CreateWorkdayDto } from './dto/create-workday.dto';
import { UpdateWorkdayDto } from './dto/update-workday.dto';
import { PrismaService } from '../prisma/prisma.service'; 
import { Workday } from '@prisma/client';


@Injectable()
export class CompanyWorkdayService {

  constructor(private prisma: PrismaService) {} 

  async createCompanyWorkday(createCompanyWorkdayDto: CreateCompanyWorkdayDto) {
    const companyWorkday =  await this.prisma.companyWorkday.create({data : createCompanyWorkdayDto });
    await this.createDefaultWorkday(companyWorkday.id);
  }

  async createWorkday(createWorkdayDto: CreateWorkdayDto) {
    return this.prisma.workday.create({data : createWorkdayDto });
  }

  async createDefaultWorkday(companyWorkdayId : string){

    const Jornada1 = await this.prisma.workday.create({
      data : {
          companyWorkdayId: companyWorkdayId,
          monday: "08:00" ,
          tuesday: "08:00" ,
          wednesday: "08:00" ,
          thursday: "08:00",
          friday: "08:00",
          saturday: "00:00",
          sunday: "00:00" ,
          monthStart : 13 ,
          description: "Default"
      }
    });

  }

  async updateCompanyWorkday(id: string, updateCompanyWorkdayDto: UpdateCompanyWorkdayDto) {
    return this.prisma.companyWorkday.update({ 
      where : { id } ,
      data : updateCompanyWorkdayDto
     });
  }

  async updateWorkday(id: string, updateWorkday: UpdateWorkdayDto) {
    return this.prisma.workday.update({ 
      where : { id } ,
      data : updateWorkday
     });
  }

  async removeCompanyWorkday(id: string) {

    const companyWorkday = await this.prisma.companyWorkday.findFirstOrThrow({where : {id}});

    const companyId = companyWorkday.companyId;

    const numberOfCompanysId = await this.prisma.companyWorkday.count({ where : { companyId : companyId }});

    if ( numberOfCompanysId <= 1 ) { return { statusCode: 203, message: "Debes tener una jornada" }; };
    
    return this.prisma.companyWorkday.delete({
      where: { id}
    });
  }

  async removeWorkday(id: string) {
    const workday = await this.prisma.workday.findFirstOrThrow({where : { id }});
    
    if (workday.monthStart === 13) {
      return { statusCode: 203, message: "No puedes borrar la jornada por defecto" };
    }

    return this.prisma.workday.delete({
      where: { id}
    });
  }

  getWorkdayForToday(workdays: Workday[]) {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1; // Months are 0 indexed in JavaScript, so we add 1

    // Buscar un workday donde la fecha de hoy esté dentro del rango
    const matchingWorkday = workdays.find((workday) => {
        const { dayStart, monthStart, dayEnd, monthEnd } = workday;
        return (
            (currentMonth > monthStart || (currentMonth === monthStart && currentDay >= dayStart)) &&
            (currentMonth < monthEnd || (currentMonth === monthEnd && currentDay <= dayEnd))
        );
    });

    // Si se encontró un workday que coincide con la fecha de hoy, devolverlo
    if (matchingWorkday) {
        return matchingWorkday;
    }

    // Si no se encontró ninguna coincidencia, buscar el workday con monthStart igual a 13
    const defaultWorkday = workdays.find((workday) => workday.monthStart === 13);

    // Si se encontró un workday predeterminado, devolverlo; de lo contrario, devolver null o manejar el caso según sea necesario
    if (defaultWorkday) {
        return defaultWorkday;
    } else {
      const dataStandard = {
        "monday": "09:30",
        "tuesday": "09:30",
        "wednesday": "09:30",
        "thursday": "09:30",
        "friday": "09:00",
        "saturday": "00:00",
        "sunday": "00:00"
    }
        return dataStandard;
    }
}

  async todayWorkday(userId : string , datePass : Date = new Date()){

  
  const user = await  this.prisma.user.findFirstOrThrow({ where : { id : userId}});
  const companyWorkday =  await this.prisma.companyWorkday.findFirstOrThrow({ where : { id : user.companyWorkdayId}});
  
  const workdays = await this.prisma.workday.findMany({
    where : {
      companyWorkdayId : companyWorkday.id
    }
  });

  const filterWorkday = this.getWorkdayForToday(workdays);
  

  try {
    const date = new Date(datePass); 
    const dayWeek = date.getDay(); 
  
    const nameWeeks = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const nameDay = nameWeeks[dayWeek];
  
    const todayWork = filterWorkday[nameDay];
  
    return todayWork ;
    
  } catch (error) {
    return { message : 'No hay ninguna jornada registrada'}
  }

  }

  async allWorkdayByCompanyId(companyId : string ){

    const companyWorkday = await this.prisma.company.findUniqueOrThrow({
      where: { id : companyId },
      include : { 
        CompanyWorkday : true
      }
    });
    

    return companyWorkday.CompanyWorkday;
    
  }

  async allWorkdayByCompanyWorkdayId(companyWorkdayId : string ){

    const companyWorkday = await this.prisma.companyWorkday.findUniqueOrThrow({
      where: { id : companyWorkdayId },
      include : { 
        workday : true
      }
    });
    

    return companyWorkday.workday;
    
  }

  async allWorkdayOnlyIdByCompanyId(companyId : string ){

    const companyWorkday = await this.prisma.company.findUniqueOrThrow({
      where: { id : companyId },
      include : { 
        CompanyWorkday : {
          select : {
            id:true ,
            description:true
          }
        }
      }
    });
    

    return companyWorkday.CompanyWorkday;
    
  }



}
