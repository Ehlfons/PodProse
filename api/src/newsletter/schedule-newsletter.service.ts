import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NewsletterService } from './newsletter.service';

@Injectable()
export class ScheduleNewsletterService {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Cron('*/1 * * * *')
  async handleCron() {
    console.log('Sending newsletters every 5 minutes...');
    await this.newsletterService.sendDailyNewsletters();
  }
}
