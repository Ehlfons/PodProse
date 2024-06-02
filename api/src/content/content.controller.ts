import { Controller, Get, Param, Res, Delete, NotFoundException, Patch, Body, HttpStatus, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Response } from 'express';
import { Readable } from 'stream';
import { ContentService } from './content.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('content')
class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get(':fileName')
  async getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const data = await this.contentService.getFile(fileName);

    // Convert the stream to a buffer
    const buffer = await this.contentService.streamToBuffer(data.Body as Readable);

    // Set the appropriate content type (optional)
    res.setHeader('Content-Type', data.ContentType);
    
    // Send the buffer as response
    res.send(buffer);
  }

  @Get()
  async listPodcasts(@Res() res: Response) {
    const data = await this.contentService.listPodcasts();
    res.json(data);
  }

  @Get('user/:userId')
  async getPodcastsByUser(@Param('userId') userId: string, @Res() res: Response) {
    const podcasts = await this.contentService.getPodcastsByUser(userId);
    res.json(podcasts);
  }

  @Get('podcast/:id')
  async getPodcastById(@Param('id') id: string, @Res() res: Response) {
    const podcast = await this.contentService.getPodcastById(id);
    if (!podcast) {
      throw new NotFoundException('Podcast not found');
    }
    res.json(podcast);
  }

  @Patch('podcast/:id')
  @UseInterceptors(FilesInterceptor('files'))
  async updatePodcast(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    await this.contentService.updatePodcast(id, files, title, description);
    return {
      statusCode: HttpStatus.OK,
      message: 'Podcast updated successfully',
    };
  }

  @Delete(':fileName')
  async deleteFile(@Param('fileName') fileName: string, @Res() res: Response) {
    await this.contentService.deleteFile(fileName);

    res.status(204).send();
  }

  @Delete('podcast/:id')
  async deletePodcast(@Param('id') id: string) {
    try {
      await this.contentService.deletePodcast(id);
      return { message: 'Podcast deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Podcast not found');
      }
      throw error;
    }
  }
}

export default ContentController;