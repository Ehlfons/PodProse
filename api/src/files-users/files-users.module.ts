import { Module } from '@nestjs/common';
import { FilesUsersService } from './files-users.service';
import { FilesUsersController } from './files-users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [FilesUsersController],
  providers: [FilesUsersService],
  exports:[FilesUsersService]
})
export class FilesUsersModule {}
