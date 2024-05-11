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
    // A x hora salta la funcion para comprobar el status de los trabajadores para ese dia
    cron.schedule('47 15 * * *', () => {
      this.checkGlobalStatusAutomatic();
      console.log('Fin');
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

  async verifyAndChangeStatus(userId: string) {
    const today = new Date();
    const knowWork = await this.knowwork.knowWorkByUserId(userId, today);
    await this.changueStatus(userId, knowWork.status);
  }

  async knowStatus(userId: string) {
    return await this.prisma.statusWorkers.findFirstOrThrow({
      where: { userId },
      select: {
        status: true,
      },
    });
  }

  async knowStatusByCompanyId(companyId: string) {
    const statusData = await this.prisma.company.findUnique({
      where: {
        id: companyId,
      },
      select: {
        statusWorkers: {
          select: {
            status: true,
          },
        },
      },
    });

    const statusCounts = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
    };

    statusData.statusWorkers.forEach((worker) => {
      statusCounts[worker.status.toString()]++;
    });

    return statusCounts;
  }

  async checkGlobalStatusAutomatic() {
    const users = await this.prisma.user.findMany();
    //console.log(users); ;

    users.forEach((user) => {
      this.verifyAndChangeStatus(user.id);
    });
  }


}
