import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EnviarCorreoService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'podprose.info@gmail.com',
        pass: 'huod lgcr cpix bevd',
      },
    });
  }

  async enviarCorreo(
    email_destino: string,
    username: string,
    token: string,
    type: 'verify' | 'reset',
  ) {
    const link =
      type === 'verify'
        ? `http://localhost:5173/auth/verify/${token}` // Asegúrate de que esta URL es correcta
        : `http://localhost:5173/reset-password?token=${token}`;

    const subject =
      type === 'verify'
        ? 'Confirma tu cuenta en PodProse'
        : 'Restablece tu contraseña en PodProse';

    const html =
      type === 'verify'
        ? `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .container {
              max-width: 600px;
              padding-top: 5px;
              border-radius: 10px;
            }
            h1 {
              color: #333333;
            }
            p {
              color: #666666;
            }
            .footer-logo {
              width: 300px;
            }
            a {
              display: inline-block;
              padding: 10px 20px;
              background-color: #B0E444;
              color: #ffffff !important;
              text-decoration: none;
              border-radius: 20px;
            }
            a:hover {
              background-color: #87b32f;
            }
          </style>
        </head>
        <body>
          <div class="container">
          <h1>¡Bienvenid@ a PodProse ${username}!</h1>
            <p>Gracias por registrarte. Por favor, confirma tu correo electrónico haciendo clic en el siguiente enlace:</p><br>
            <a href='${link}' style="color: white !important;">Confirmar Email</a>
          </div>
        </body>
      </html>
      `
        : `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .container {
              max-width: 600px;
              padding-top: 5px;
              border-radius: 10px;
            }
            h1 {
              color: #333333;
            }
            p {
              color: #666666;
            }
            .footer-logo {
              width: 300px;
            }
            a {
              display: inline-block;
              padding: 10px 20px;
              background-color: #B0E444;
              color: #ffffff !important;
              text-decoration: none;
              border-radius: 20px;
            }
            a:hover {
              background-color: #87b32f;
            }
          </style>
        </head>
        <body>
          <div class="container">
          <h1>Restablece tu contraseña ${username}!</h1>
            <p>Por favor, haz clic en el siguiente enlace para restablecer tu contraseña:</p><br>
            <a href='${link}' style="color: white !important;">Restablecer Contraseña</a>
          </div>
        </body>
      </html>
      `;

    const mailOptions = {
      from: 'podprose.info@gmail.com',
      to: email_destino,
      subject: subject,
      html: html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado exitosamente a', email_destino);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw new Error(`No se pudo enviar el correo a ${email_destino}`);
    }
  }
}
