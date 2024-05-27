import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  @HttpCode(HttpStatus.CREATED)
  async subscribe(@Body('email') email: string) {
    await this.newsletterService.subscribe(email);
    return { message: 'Subscription successful' };
  }
}
