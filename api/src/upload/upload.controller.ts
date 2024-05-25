import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Get,
  Param,
  Res,
  Delete,
  Body,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Response } from 'express';
import { Readable } from 'stream';

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

  @Get(':fileName')
  async getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const data = await this.uploadService.getFile(fileName);

    // Convert the stream to a buffer
    const buffer = await this.uploadService.streamToBuffer(data.Body as Readable);

    // Set the appropriate content type (optional)
    res.setHeader('Content-Type', data.ContentType);
    
    // Send the buffer as response
    res.send(buffer);
  }

  @Get()
  async listPodcasts(@Res() res: Response) {
    const data = await this.uploadService.listPodcasts();

    res.json(data);
  }

  @Get('user/:userId')
  async getPodcastsByUser(@Param('userId') userId: string, @Res() res: Response) {
    const podcasts = await this.uploadService.getPodcastsByUser(userId);
    res.json(podcasts);
  }

  @Delete(':fileName')
  async deleteFile(@Param('fileName') fileName: string, @Res() res: Response) {
    await this.uploadService.deleteFile(fileName);

    res.status(204).send();
  }

  @Delete('podcast/:id')
  async deletePodcast(@Param('id') id: string) {
    try {
      await this.uploadService.deletePodcast(id);
      return { message: 'Podcast deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Podcast not found');
      }
      throw error;
    }
  }
}