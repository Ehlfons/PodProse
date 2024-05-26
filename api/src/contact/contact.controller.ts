import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async sendContactEmail(@Body() body: any) {
    const { email, fullName, subject, message, phone } = body;
    await this.contactService.sendEmail(
      email,
      fullName,
      subject,
      message,
      phone,
    );
  }
}
