import { Controller, Get } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Gestión de mail')
@Controller('mailer')
export class MailerController {


    constructor(private readonly mailerService: MailerService) {}

    @Get('send-email')
    async sendEmail() {
      await this.mailerService.sendEmail(
        'destinatario@example.com',
        'Asunto del correo',
        'Este es un mensaje de prueba enviado desde NestJS con nodemailer.'
      );
      return 'Correo electrónico enviado con éxito.';
    }
}
