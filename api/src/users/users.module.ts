import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './user.entity';

@Module({
  imports: [PrismaModule/* , TypeOrmModule.forFeature([User]) */],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
