import { Injectable } from '@nestjs/common';
import { CreateCompanyWorkdayDto } from './dto/create-company-workday.dto';
import { UpdateCompanyWorkdayDto } from './dto/update-company-workday.dto';
import { PrismaService } from '../prisma/prisma.service'; 


@Injectable()
export class CompanyWorkdayService {

  constructor(private prisma: PrismaService) {} 

  async create(createCompanyWorkdayDto: CreateCompanyWorkdayDto) {
    return this.prisma.companyWorkday.create({data : createCompanyWorkdayDto });
  }

  findAll() {
    return 
    return `This action returns all companyWorkday`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyWorkday`;
  }

  async update(id: string, updateCompanyWorkdayDto: UpdateCompanyWorkdayDto) {
    return this.prisma.companyWorkday.update({ 
      where : { id } ,
      data : updateCompanyWorkdayDto
     });
    return `This action updates a #${id} companyWorkday`;
  }

  remove(id: string) {
    return this.prisma.companyWorkday.delete({
      where: { id}
    });
  }


  async todayWorkday(userId : string){

    const dataStandard = {
      "monday": "09:30",
      "tuesday": "09:30",
      "wednesday": "09:30",
      "thursday": "09:30",
      "friday": "09:00",
      "saturday": "00:00",
      "sunday": "00:00"
  }
  
  const user = await  this.prisma.user.findFirstOrThrow({ where : { id : userId}});
  const companyWorkday = user.companyWorkdayId ?  await this.prisma.companyWorkday.findFirstOrThrow({ where : { id : user.companyWorkdayId}}) : dataStandard ;
  


  try {
    const date = new Date(); 
    const dayWeek = date.getDay(); 
  
    const nameWeeks = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const nameDay = nameWeeks[dayWeek];
  
    const todayWork = companyWorkday[nameDay];
  
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
