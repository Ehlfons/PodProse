import { Controller, Post, Body, HttpCode, HttpStatus, ValidationPipe } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { SubscribeNewsletterDto } from './dto/subscribe-newsletter.dto';

@ApiTags('Newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: SubscribeNewsletterDto })
  async subscribe(@Body(ValidationPipe) subscribeNewsletterDto: SubscribeNewsletterDto) {
    await this.newsletterService.subscribe(subscribeNewsletterDto.email);
    return { message: 'Subscription successful' };
  }
}
