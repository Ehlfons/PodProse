import {
  Controller,
  Post,
  UploadedFiles,
  UploadedFile,
  UseInterceptors,
  Param,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('userId') userId: string,
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    const audioFile = files.find(file => file.mimetype.startsWith('audio/'));
    const imageFile = files.find(file => file.mimetype.startsWith('image/'));

    if (audioFile) {
      await this.uploadService.upload(audioFile.originalname, audioFile.buffer, 'audio', userId, title, description);
    }
    if (imageFile) {
      await this.uploadService.upload(imageFile.originalname, imageFile.buffer, 'image', userId, title, description);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Files uploaded successfully',
    };
  }

  // Endpoint para subir un solo archivo de imagen del usuario, para actualizar la imagen de perfil
  @Post('user-image/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: string,
  ) {
    const url_img = await this.uploadService.uploadUserImage(file.originalname, file.buffer, userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'User image uploaded successfully',
      url_img: url_img,
    };
  }
}