import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NewsletterService } from './newsletter.service';

@Injectable()
export class ScheduleNewsletterService {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    console.log('Sending newsletters every 5 minutes...');
    await this.newsletterService.sendDailyNewsletters();
  }
}
