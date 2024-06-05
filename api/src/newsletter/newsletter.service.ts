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

  private replacePlaceholders(template: string, data: any): string {
    return template.replace(/{{(\w+(\.\w+)*)}}/g, (match, p1) => {
      const keys = p1.split('.');
      let value = data;
      for (const key of keys) {
        value = value[key];
        if (value === undefined) {
          return match;
        }
      }
      return value;
    });
  }

  private async getRandomPodcasts(limit: number): Promise<any[]> {
    const count = await this.prisma.podcast.count();
    const skip = Math.floor(Math.random() * (count - limit + 1));
    return this.prisma.podcast.findMany({
      take: limit,
      skip: skip,
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

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const podcasts = await this.getRandomPodcasts(3);

    const data = {
      user: {
        name: user.name,
      },
      podcast1: podcasts[0],
      podcast2: podcasts[1],
      podcast3: podcasts[2],
    };

    const mailOptions = {
      from: 'podprose.info@gmail.com',
      to: email,
      subject: this.replacePlaceholders(template.subject, data),
      html: this.replacePlaceholders(template.body, data),
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
      const user = await this.prisma.user.findUnique({
        where: { email: subscriber.email },
      });
      if (!user) {
        console.error(`User not found for email ${subscriber.email}`);
        continue;
      }

      const podcasts = await this.getRandomPodcasts(3);

      const data = {
        user: {
          name: user.name,
        },
        podcast1: podcasts[0],
        podcast2: podcasts[1],
        podcast3: podcasts[2],
      };

      const mailOptions = {
        from: 'podprose.info@gmail.com',
        to: subscriber.email,
        subject: this.replacePlaceholders(template.subject, data),
        html: this.replacePlaceholders(template.body, data),
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
