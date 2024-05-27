import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../prisma/prisma.service';

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
      data: { email },
    });

    const templates = await this.prisma.newsletterTemplate.findMany();
    if (templates.length === 0) {
      throw new Error('No email templates found');
    }

    const template = templates[Math.floor(Math.random() * templates.length)];

    const mailOptions = {
      from: 'podprose.info@gmail.com',
      to: email,
      subject: template.subject,
      html: template.body,
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
    const templates = await this.prisma.newsletterTemplate.findMany();
    if (templates.length === 0) {
      throw new Error('No email templates found');
    }

    for (const subscriber of subscribers) {
      const template = templates[Math.floor(Math.random() * templates.length)];
      const mailOptions = {
        from: 'podprose.info@gmail.com',
        to: subscriber.email,
        subject: template.subject,
        html: template.body,
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
