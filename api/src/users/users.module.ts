import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Importa el servicio de Prisma
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService, // Agrega el servicio de Prisma como proveedor
  ],
  exports: [UsersService],
})
export class UsersModule {}
