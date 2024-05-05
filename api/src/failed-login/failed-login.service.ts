import { Injectable } from '@nestjs/common';
import { create } from 'domain';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FailedLoginService {
  constructor(private readonly prisma: PrismaService) {}

  async recordFailedAttempt(username: string): Promise<void> {
    await this.prisma.failedLoginAttempt.create({
      data: {
        username
      }
    });
  }

  async getFailedAttempts(username: string): Promise<number> {
    const failedAttempts = await this.prisma.failedLoginAttempt.count({
      where: {
        username
      }
    });
    return failedAttempts;
  }

  async clearFailedAttempts(username: string): Promise<void> {
    await this.prisma.failedLoginAttempt.deleteMany({
      where: {
        username
      }
    });
  }


  async getFailedTime(username: string) {
    return await this.prisma.failedLoginAttempt.findFirst({
      where: {
        username,
      },
      orderBy: {
        createdAt: 'desc', // Ordena por fecha de creación en orden descendente para obtener el último intento fallido
      },
    });
  }

  
}
