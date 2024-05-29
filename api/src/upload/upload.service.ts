import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import {
  GetObjectCommandOutput,
  ListObjectsV2CommandOutput,
  DeleteObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async upload(fileName: string, file: Buffer, type: 'audio' | 'image', userId: string, title: string, description: string) {
    const bucketName = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: file,
      }),
    );

    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    if (type === 'audio') {
      // Guarda el podcast en la base de datos
      await this.prisma.podcast.create({
        data: {
          title,
          description,
          url_audio: `https://${bucketName}.s3.amazonaws.com/${fileName}`,
          url_img: '',
          user: {
            connect: { id: userId },
          },
        },
      });
    } else if (type === 'image') {
      // Actualiza el podcast con la URL de la imagen
      await this.prisma.podcast.update({
        where: { title },
        data: {
          url_img: `https://${bucketName}.s3.amazonaws.com/${fileName}`,
        },
      });
    }
  }

  // Subir una sola imagen del usuario
  async uploadUserImage(fileName: string, file: Buffer, userId: string) {
    const bucketName = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { url_img: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const previousImageUrl = user.url_img;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: file,
      }),
    );

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        url_img: `https://${bucketName}.s3.amazonaws.com/${fileName}`,
      },
    });

    // Eliminar la imagen anterior del bucket de S3 si no es "default.png" y no está en uso
    if (previousImageUrl && !previousImageUrl.includes('default.png')) {
      const isImageInUse = await this.prisma.podcast.findFirst({
        where: { url_img: previousImageUrl },
      });

      if (!isImageInUse) {
        const previousImageKey = previousImageUrl.split('/').pop();
        await this.s3Client.send(
          new DeleteObjectCommand({
            Bucket: bucketName,
            Key: previousImageKey,
          }),
        );
      }
    }

    return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
  }
}
