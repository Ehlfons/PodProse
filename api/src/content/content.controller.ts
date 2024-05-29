import { Response } from 'express';
import { Controller, Get, Param, Res, Delete, NotFoundException } from '@nestjs/common';
import { Readable } from 'stream';
import { ContentService } from './content.service';

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