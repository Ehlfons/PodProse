import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from 'src/mailer/mailer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron } from '@nestjs/schedule';
import { v4 as uuidCreate } from 'uuid';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly email: MailerService,
  ) {}

  async addTokenAndSendEmail(email: string) {
    try {
      const resetToken = uuidCreate() + uuidCreate();
      const user = await this.prisma.user.findFirstOrThrow({
        where: {
          email: email,
        },
      });

      const userId = user.id;
      const username = user.name;


      await this.prisma.resetPassword.create({
        data: {
            userId,
            resetToken
        }
      });

      await this.email.sendResetPassword(email, username, resetToken);

      return 'Correo Enviado...No lo olvides..Otra vez..';
    } catch (error) {
      return 'Problemitas con tu cuenta...';
    }
  }

  async changePassword(email: string , token: string , newPassword: string){

    const dataReset = await this.prisma.resetPassword.findFirst({
      where: { resetToken: token },
    });
  
    if (!dataReset) {
      throw new NotFoundException('Parece que no podemos hacer anda por ti..vuelve a conseguir el link');
    }

    const userId = dataReset.userId;

    const user = await this.prisma.user.findUniqueOrThrow({
      where : { id : userId}
    });

    if( email === user.email){

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      try{
        await this.prisma.user.update({
          where : { id : userId} ,
          data : {
            password: hashedPassword,
          }   
        });

        await this.prisma.resetPassword.delete({ where : { userId}});
        return "Datos actulizados , no olvides tu nueva contraseña!"

      }catch(error){

        return `Algo malo pasó..${error.message}`

      }

    }

    return "No deberias estar haciendo esto.."


  }







  // Se ejecutará cada hora en punto
  @Cron('0 * * * *') 
  async handleCron() {
    await this.cleanupOldData();
  }

  //Borra los datos que lleven mas de una hora
  async cleanupOldData() {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    await this.prisma.resetPassword.deleteMany({
      where: {
        createdAt: { lt: oneHourAgo },
      },
    });

    }


}
