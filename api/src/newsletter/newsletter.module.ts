import { Module } from '@nestjs/common';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';
import { ScheduleNewsletterService } from './schedule-newsletter.service';
import { PrismaModule } from '../prisma/prisma.module'; // Asegúrate de ajustar la ruta según tu estructura de carpetas

@Module({
  imports: [PrismaModule],
  controllers: [NewsletterController],
  providers: [NewsletterService, ScheduleNewsletterService],
})
export class NewsletterModule {}
