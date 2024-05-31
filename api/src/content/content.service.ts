import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { GetObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { GetObjectCommandOutput, ListObjectsV2CommandOutput, DeleteObjectCommandOutput } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

@Injectable()
export class ContentService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async getFile(fileName: string): Promise<GetObjectCommandOutput> {
    const data = await this.s3Client.send(
      new GetObjectCommand({
        Bucket: this.configService.getOrThrow('AWS_S3_BUCKET_NAME'),
        Key: fileName,
      }),
    );

    return data;
  }

  async listFiles(): Promise<ListObjectsV2CommandOutput> {
    const data = await this.s3Client.send(
      new ListObjectsV2Command({
        Bucket: this.configService.getOrThrow('AWS_S3_BUCKET_NAME'),
      }),
    );

    return data;
  }

  async listPodcasts() {
    const podcasts = await this.prisma.podcast.findMany();
    return podcasts;
  }

  async getPodcastsByUser(userId: string) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!userExists) {
      throw new NotFoundException('User not found');
    }
  
    const podcasts = await this.prisma.podcast.findMany({
      where: { userId: userId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
  
    // Mapear el resultado para incluir el nombre de usuario
    const podcastsWithUsername = podcasts.map(podcast => ({
      ...podcast,
      username: podcast.user.username,
      user: undefined,  // Eliminar el objeto user para que no se duplique
    }));
  
    return podcastsWithUsername;
  }

  async deleteFile(fileName: string): Promise<DeleteObjectCommandOutput> {
    const bucketName = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
    const data = await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: fileName,
      }),
    );

    // Borra la entrada de la base de datos
    await this.prisma.podcast.delete({
      where: { url_audio: `https://${bucketName}.s3.amazonaws.com/audio/${fileName}` },
    });

    return data;
  }

  async deletePodcast(podcastId: string): Promise<void> {
    const podcast = await this.prisma.podcast.findUnique({
      where: { id: podcastId },
    });

    if (!podcast) {
      throw new NotFoundException('Podcast not found');
    }

    // Eliminar archivos de S3
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.configService.getOrThrow('AWS_S3_BUCKET_NAME'),
        Key: podcast.url_audio.split('/').pop(), // Obtiene el nombre del archivo del URL
      }),
    );

    if (podcast.url_img) {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.configService.getOrThrow('AWS_S3_BUCKET_NAME'),
          Key: podcast.url_img.split('/').pop(), // Obtiene el nombre del archivo del URL
        }),
      );
    }

    // Borrar el podcast de la base de datos
    await this.prisma.podcast.delete({
      where: { id: podcastId },
    });
  }

  // Convierte un stream de Node.js a un Buffer
  async streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const chunks: any[] = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }
}