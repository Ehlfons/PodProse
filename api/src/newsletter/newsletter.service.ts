import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../prisma/prisma.service'; // Asegúrate de tener un servicio de Prisma configurado

@Injectable()
export class NewsletterService {
  private transporter: nodemailer.Transporter;

  constructor(private prisma: PrismaService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'podprose.info@gmail.com',
        pass: 'huod lgcr cpix bevd',
      },
    });
  }

  async subscribe(email: string) {
    await this.prisma.newsletter.create({
      data: {
        email,
      },
    });

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
    const subscribers = await this.prisma.newsletter.findMany();
    for (const subscriber of subscribers) {
      const mailOptions = {
        from: 'podprose.info@gmail.com',
        to: subscriber.email,
        subject: 'Your PodProse Newsletter',
        html: '<p>Here is your update from PodProse!</p>',
      };

      try {
        await this.transporter.sendMail(mailOptions);
        console.log('Newsletter sent to', subscriber.email);
      } catch (error) {
        console.error('Error sending newsletter:', error);
      }
    }
  }
}
