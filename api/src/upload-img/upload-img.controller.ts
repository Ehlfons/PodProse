import { Controller, Post, UploadedFile, UseGuards, UseInterceptors , Request, InternalServerErrorException, Body} from '@nestjs/common';
import { UploadImgService } from './upload-img.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Request as ExpressRequest } from 'express'; // Importa Request de Express
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';



@Controller('upload-img')
export class UploadImgController {
  constructor(
    private readonly authService: AuthService ,
    private readonly prisma: PrismaService ,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly uploadImgService: UploadImgService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return callback(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file , @Body('userId') userId: string ) {
    const response = await this.uploadImgService.uploadFile(userId,file);
    return response;
  }
}
