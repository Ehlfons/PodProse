import { Module } from '@nestjs/common';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';
import { ScheduleNewsletterService } from './schedule-newsletter.service';

@Module({
  controllers: [NewsletterController],
  providers: [NewsletterService, ScheduleNewsletterService],
})
export class NewsletterModule {}
