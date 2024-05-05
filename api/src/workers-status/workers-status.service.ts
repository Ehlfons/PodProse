import { Injectable } from '@nestjs/common';
import { KnowWorkService } from 'src/know-work/know-work.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as cron from 'node-cron';

@Injectable()
export class WorkersStatusService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly knowwork: KnowWorkService,
  ) {
        // Ejemplo de ejecución de una función a las 8:00 AM todos los días
        cron.schedule('59 13 * * *', () => {
          console.log("Te vas para caasa");
        });

    
  }

  async createStatus(userId: string, companyId: string, status: number = 3) {
    try {
      const datoActualizado = await this.prisma.statusWorkers.create({
        data: {
          userId: userId,
          companyId: companyId,
          status: status,
        },
      });
      console.log('Dato creado:', datoActualizado);
    } catch (error) {
      console.error('Error', error);
    }
  }

  async changueStatus(userId: string, status) {
    try {
      const datoActualizado = await this.prisma.statusWorkers.update({
        where: { userId: userId },
        data: {
          status: status,
        },
      });
      console.log('Dato creado:', datoActualizado);
    } catch (error) {
      console.error('Error', error);
    }
  }

  async statusFinal(userId: string) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const knowWork = await this.knowwork.knowWorkByUserId(userId, tomorrow);

    await this.changueStatus(userId, knowWork.status);
  }

  async knowStatus(userId : string){
    return await this.prisma.statusWorkers.findFirstOrThrow({ 
        where : { userId } ,
        select : {
            status:true
        }
    });
  }


  async knowStatusByCompanyId(companyId: string) {
    const statusData = await this.prisma.company.findUnique({
      where: {
        id: companyId
      },
      select: {
        statusWorkers: {
          select: {
            status: true
          }
        }
      }
    });
  
    // Inicializamos un objeto para contener la cantidad de cada estado
    const statusCounts = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0
    };
  
    // Contamos la cantidad de cada estado
    statusData.statusWorkers.forEach((worker) => {
      statusCounts[worker.status.toString()]++;
    });
  
    // Devolvemos los conteos en un objeto JSON
    return statusCounts;
  }
  
}
