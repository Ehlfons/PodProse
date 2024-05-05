import { Module } from '@nestjs/common';
import { ImagenService } from './imagen.service';
import { ImagenController } from './imagen.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ImagenController],
  providers: [ImagenService , PrismaService],
})
export class ImagenModule {}
