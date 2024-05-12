import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidCreate } from 'uuid';

@Injectable()
export class ValidateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async addTokenVerification(user: string): Promise<string> {
    const verificationToken = uuidCreate() + uuidCreate();

    const data = {
      userId: user,
      verificationToken: verificationToken,
    };

    await this.prisma.verificationUser.create({
      data: data,
    });

    return verificationToken;
  }

  async verificateUserByToken(token: string): Promise<string> {
    try {
      const consulta = await this.prisma.verificationUser.findFirstOrThrow({
        where: {
          verificationToken: token,
        },
      });

      const today = new Date();

      await this.prisma.user.update({
        where: {
          id: consulta.userId,
        },
        data: {
          verificateAt: today,
        },
      });

      await this.prisma.verificationUser.delete({
        where: { userId: consulta.userId },
      });

      return 'Cuenta VERIFICADA';
    } catch (error) {
      // Maneja el error aquí si ocurre algún problema durante la verificación
      console.error('Error al validar la cuenta:', error);
      return 'Error al validar la cuenta';
    }
  }
}
