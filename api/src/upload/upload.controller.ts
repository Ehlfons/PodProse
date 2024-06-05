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
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { UploadFilesDto } from './dto/upload-files.dto';
import { UploadUserImageDto } from './dto/upload-user-image.dto';

@ApiTags('AWS S3 - Uploads')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // Endpoint para subir podcast
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  @ApiBody({ type: UploadFilesDto })
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: UploadFilesDto,
  ) {
    const { userId, title, description, categoryId } = body;
    const audioFile = files.find((file) => file.mimetype.startsWith('audio/'));
    const imageFile = files.find((file) => file.mimetype.startsWith('image/'));

    if (audioFile) {
      await this.uploadService.upload(
        audioFile.originalname,
        audioFile.buffer,
        'audio',
        userId,
        title,
        description,
        categoryId,
      );
    }
    if (imageFile) {
      await this.uploadService.upload(
        imageFile.originalname,
        imageFile.buffer,
        'image',
        userId,
        title,
        description,
        categoryId,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Files uploaded successfully',
    };
  }

  // Endpoint para subir un solo archivo de imagen del usuario, para actualizar la imagen de perfil
  @Post('user-image/:userId')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({ type: UploadUserImageDto })
  async uploadUserImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: string,
  ) {
    const url_img = await this.uploadService.uploadUserImage(
      file.originalname,
      file.buffer,
      userId,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'User image uploaded successfully',
      url_img: url_img,
    };
  }
}
