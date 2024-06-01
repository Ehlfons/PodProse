import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Client, GetObjectCommand, ListObjectsV2Command, DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
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
    const podcastsWithUsername = podcasts.map((podcast) => ({
      ...podcast,
      username: podcast.user.username,
      user: undefined, // Eliminar el objeto user para que no se duplique
    }));

    return podcastsWithUsername;
  }

  async getPodcastById(id: string) {
    const podcast = await this.prisma.podcast.findUnique({
      where: { id },
    });
    return podcast;
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
      where: {
        url_audio: `https://${bucketName}.s3.amazonaws.com/audio/${fileName}`,
      },
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

    const bucketName = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');

    // Eliminar archivo de audio de S3 si no está en uso por otros podcasts
    if (podcast.url_audio) {
      const audioKey = `audio/${podcast.url_audio.split('/').pop()}`;

      // Verificar si el archivo de audio está en uso por otros podcasts
      const isAudioUsed = await this.prisma.podcast.findFirst({
        where: {
          url_audio: podcast.url_audio,
          id: { not: podcastId },
        },
      });

      if (!isAudioUsed) {
        await this.s3Client.send(
          new DeleteObjectCommand({
            Bucket: bucketName,
            Key: audioKey,
          }),
        );
      }
    }

    // Eliminar archivo de imagen de S3 si no está en uso por otros podcasts o usuarios
    if (podcast.url_img) {
      const imgKey = `img/${podcast.url_img.split('/').pop()}`;

      // Verificar si el archivo de imagen está en uso por otros podcasts
      const isImageUsedByPodcast = await this.prisma.podcast.findFirst({
        where: {
          url_img: podcast.url_img,
          id: { not: podcastId },
        },
      });

      // Verificar si el archivo de imagen está en uso por otros usuarios
      const isImageUsedByUser = await this.prisma.user.findFirst({
        where: {
          url_img: podcast.url_img,
        },
      });

      if (!isImageUsedByPodcast && !isImageUsedByUser) {
        await this.s3Client.send(
          new DeleteObjectCommand({
            Bucket: bucketName,
            Key: imgKey,
          }),
        );
      }
    }

    // Borrar el podcast de la base de datos
    await this.prisma.podcast.delete({
      where: { id: podcastId },
    });
  }

  async updatePodcast(
    podcastId: string,
    files: Express.Multer.File[],
    title?: string,
    description?: string,
  ) {
    const podcast = await this.prisma.podcast.findUnique({
      where: { id: podcastId },
    });

    if (!podcast) {
      throw new NotFoundException('Podcast not found');
    }

    const bucketName = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
    const audioFile = files.find((file) => file.mimetype.startsWith('audio/'));
    const imageFile = files.find((file) => file.mimetype.startsWith('image/'));

    // Almacenar las URLs antiguas para poder eliminarlas después si es necesario
    const oldAudioUrl = podcast.url_audio;
    const oldImageUrl = podcast.url_img;

    if (audioFile) {
      const audioKey = `audio/${audioFile.originalname}`;
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: audioKey,
          Body: audioFile.buffer,
        }),
      );
      podcast.url_audio = `https://${bucketName}.s3.amazonaws.com/${audioKey}`;
    }

    if (imageFile) {
      const imageKey = `img/${imageFile.originalname}`;
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: imageKey,
          Body: imageFile.buffer,
        }),
      );
      podcast.url_img = `https://${bucketName}.s3.amazonaws.com/${imageKey}`;
    }

    // Actualizar el podcast en la base de datos
    await this.prisma.podcast.update({
      where: { id: podcastId },
      data: {
        title: title ?? podcast.title,
        description: description ?? podcast.description,
        url_audio: podcast.url_audio,
        url_img: podcast.url_img,
      },
    });

    // Eliminar el archivo de audio anterior si existe y no está en uso por otros podcasts
    if (audioFile && oldAudioUrl) {
      const isAudioUsed = await this.prisma.podcast.findFirst({
        where: {
          url_audio: oldAudioUrl,
          id: { not: podcastId }, // Asegurarse de no contar el podcast actual
        },
      });

      if (!isAudioUsed) {
        const oldAudioKey = oldAudioUrl.split('/').pop();
        await this.s3Client.send(
          new DeleteObjectCommand({
            Bucket: bucketName,
            Key: `audio/${oldAudioKey}`,
          }),
        );
      }
    }

    // Eliminar la imagen anterior si existe y no está en uso por otros podcasts
    if (imageFile && oldImageUrl) {
      const isImageUsed = await this.prisma.podcast.findFirst({
        where: {
          url_img: oldImageUrl,
          id: { not: podcastId }, // Asegurarse de no contar el podcast actual
        },
      });

      if (!isImageUsed) {
        const oldImageKey = oldImageUrl.split('/').pop();
        await this.s3Client.send(
          new DeleteObjectCommand({
            Bucket: bucketName,
            Key: `img/${oldImageKey}`,
          }),
        );
      }
    }
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