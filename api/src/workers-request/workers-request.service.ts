import { Injectable } from '@nestjs/common';
import { CreateWorkersRequestDto } from './dto/create-workers-request.dto';
import { UpdateWorkersRequestDto } from './dto/update-workers-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { WorkersRequest } from '@prisma/client';
import { WorkersHolidaysService } from 'src/workers-holidays/workers-holidays.service';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class WorkersRequestService {
  constructor(
    private prisma: PrismaService ,
    private holidays : WorkersHolidaysService,
    private mail : MailerService
  ) {} 

  async create(createWorkersRequestDto: CreateWorkersRequestDto) {
    //console.log(createWorkersRequestDto);
    const user = await this.prisma.user.findFirstOrThrow({where : { id : createWorkersRequestDto.userId}})

    const data = {
      ...createWorkersRequestDto,
      status:"Solicitado",
      companyId:user.companyId
    }

    return await this.prisma.workersRequest.create({ data : data})
  }

  async getWorkersRequests(companyId: string): Promise<WorkersRequest[]> {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
      include: { workersRequest: {
          include : {
            user : {
              select : {
                id:true ,
                name:true,
                email:true,
              }
            }
          }
      }},
    });

    if (!company) {
      throw new Error('No se encontró la compañia');
    }

    return company.workersRequest;
  }

  async update(id: string, updateRequestDto: UpdateWorkersRequestDto) {
    const updateRequest = await this.prisma.workersRequest.update({ 
      where: { id },
      data: updateRequestDto,
      include : {
        user : {
          select : {
            id:true ,
            name:true,
            email:true,
          }
        }
      }
    });


    const mail = await this.mail.sendStatusRequest(updateRequest);


    if (  updateRequest.status === "Aprobado" && updateRequest.type ==="Vacaciones") {

      const startDate = new Date(updateRequest.startDate);
      const endDate = new Date(updateRequest.endDate);

      let holidays= []
      // Iterar sobre cada día dentro del rango de fechas
    for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
      console.log(currentDate);
    
    
    holidays = [...holidays , await this.holidays.addHolidayByUserId(updateRequest.userId, currentDate, updateRequest.description)] ;
    
    }
    return { updateRequest , holidays};
  }

    return updateRequest ;


  }

  async getUserRequests(userId: string): Promise<WorkersRequest[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { workersRequest: true },
    });

    if (!user) {
      throw new Error('No se encontró el user');
    }

    return user.workersRequest;
  }






}
