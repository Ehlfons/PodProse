import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NewsletterService {
  private transporter: nodemailer.Transporter;
  private subscribers: string[] = []; // Lista de suscriptores

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'podprose.info@gmail.com',
        pass: 'huod lgcr cpix bevd',
      },
    });
  }

  async subscribe(email: string) {
    this.subscribers.push(email); // Añadir email a la lista de suscriptores
    const mailOptions = {
      from: 'podprose.info@gmail.com',
      to: email,
      subject: 'Welcome to PodProse Newsletter',
      html: '<p>Thank you for subscribing to our newsletter!</p>',
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Subscription email sent to', email);
    } catch (error) {
      console.error('Error sending subscription email:', error);
      throw new Error(`Failed to send email to ${email}`);
    }
  }

  async sendDailyNewsletters() {
    console.log(this.subscribers);
    for (const email of this.subscribers) {
      const mailOptions = {
        from: 'podprose.info@gmail.com',
        to: email,
        subject: 'Your Daily PodProse Newsletter',
        html: '<p>Here is your daily update from PodProse!</p>',
      };

      try {
        await this.transporter.sendMail(mailOptions);
        console.log('Daily newsletter sent to', email);
      } catch (error) {
        console.error('Error sending daily newsletter:', error);
      }
    }
  }
}
