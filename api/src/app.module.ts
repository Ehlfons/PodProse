import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ValidateUserModule } from './validate-user/validate-user.module';
import { MulterModule } from '@nestjs/platform-express';
import { FailedLoginModule } from './failed-login/failed-login.module';
import { BruteForceMiddleware } from './middleware/brute-force.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { ContactModule } from './contact/contact.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ContentModule } from './content/content.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    MulterModule.register({ dest: './uploads' }),
    UsersModule,
    AuthModule,
    ContactModule,
    ScheduleModule.forRoot(),
    NewsletterModule,
    PrismaModule,
    ValidateUserModule,
    FailedLoginModule,
    UploadModule,
    ContentModule,
    CategoriesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: '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',
      signOptions: { expiresIn: '1h' },
    }),
    CategoriesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BruteForceMiddleware).forRoutes('auth/login');
  }
}
