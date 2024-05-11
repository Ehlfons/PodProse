import { Module } from '@nestjs/common';
import { ValidateUserService } from './validate-user.service';
import { ValidateUserController } from './validate-user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [ValidateUserController],
  providers: [ValidateUserService ],
  exports:[ValidateUserService ]
})
export class ValidateUserModule {}
