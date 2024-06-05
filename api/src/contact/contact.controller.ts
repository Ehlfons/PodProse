import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { ContactDto } from './dto/contact.dto';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiBody({ type: ContactDto })
  async sendContactEmail(@Body(ValidationPipe) body: ContactDto) {
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
