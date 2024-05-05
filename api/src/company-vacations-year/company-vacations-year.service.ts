import { Body, Injectable, ValidationPipe } from '@nestjs/common';
import { CreateCompanyVacationsYearDto } from './dto/create-company-vacations-year.dto';
import { UpdateCompanyVacationsYearDto } from './dto/update-company-vacations-year.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyVacationsYearService {

  constructor(
    private prisma: PrismaService 

  ) {} 
  async create(createCompanyVacationsYearDto: CreateCompanyVacationsYearDto) {
    return await this.prisma.vacationsDaysYear.create({
      data : createCompanyVacationsYearDto
    }) ;
  }

  async findAllByCompanyId(companyId : string) {
    const vacations = await this.prisma.vacationsDaysYear.findMany({
      where : { companyId}
    });
    return vacations;
  }

  async findOneByCompanyIdYear(companyId : string , year : string) : Promise<number> {
    const vacationsDays = await this.prisma.vacationsDaysYear.findFirstOrThrow({
      where : { companyId , year} 
    });
    return vacationsDays.numberDays;
  }

  update(id: number, updateCompanyVacationsYearDto: UpdateCompanyVacationsYearDto) {
    return `This action updates a #${id} companyVacationsYear`;
  }

  remove(id: string) {
    return this.prisma.vacationsDaysYear.delete({
      where: {id}
    });
  }
}
