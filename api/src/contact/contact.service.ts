import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
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

  async sendEmail(
    email_destination: string,
    name: string,
    subject: string,
    message: string,
    phone: string,
  ) {
    // Email to the company
    const companyMailOptions = {
      from: 'podprose.info@gmail.com',
      to: 'podprose.info@gmail.com',
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333333;">Consulta: ${subject}</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email_destination}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="background-color: #f9f9f9; padding: 10px; border: 1px solid #ddd;">${message}</p>
        </div>
      `,
    };

    // Confirmation email to the client
    const clientMailOptions = {
      from: 'podprose.info@gmail.com',
      to: email_destination,
      subject: 'Confirmación de recepción de mensaje',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333333;">Hola ${name},</h2>
          <p>Hemos recibido tu mensaje con el asunto: <strong>"${subject}"</strong>.</p>
          <p>Nos pondremos en contacto contigo lo antes posible.</p>
          <p>Gracias por contactarnos.</p>
          <br>
          <p>Atentamente,</p>
          <p><strong>El equipo de PodProse</strong></p>
          <div style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee;">
            <p style="font-size: 0.9em; color: #999;">Este es un correo electrónico automatizado, por favor no responda a este mensaje.</p>
          </div>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(companyMailOptions);
      console.log('Email sent successfully to the company');

      await this.transporter.sendMail(clientMailOptions);
      console.log('Confirmation email sent successfully to the client');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error(`Failed to send email to ${email_destination}`);
    }
  }
}
