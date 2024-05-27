import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NewsletterService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your_email@gmail.com',
        pass: 'your_email_password',
      },
    });
  }

  async subscribe(email: string) {
    const mailOptions = {
      from: 'your_email@gmail.com',
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
}
