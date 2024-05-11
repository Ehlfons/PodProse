import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Recuperar Imágenes')
@Controller('imagen')
export class ImagenController {

  constructor(
    private readonly prisma : PrismaService
  ){

  }

  @Get(':nombreImagen')
  verImagen(@Param('nombreImagen') nombreImagen: string, @Res() res: Response) {
    // Ruta donde se almacenan las imágenes
    const rutaImagen = path.join(__dirname, '../../../uploads/img', nombreImagen);
    console.log(rutaImagen);

    // Verificar si la imagen existe
    if (!fs.existsSync(rutaImagen)) {
      return res.status(404).send('Imagen no encontrada');
    }

    // Establecer el tipo de contenido de la respuesta como imagen
    res.setHeader('Content-Type', 'image/jpeg');

    // Leer la imagen y enviarla como respuesta
    fs.createReadStream(rutaImagen).pipe(res);
  }

  @Get('imgProfile/:userId')
  async verImagenProvile(@Param('userId') userId: string, @Res() res: Response) {
    // Ruta donde se almacenan las imágenes

    const user = await this.prisma.user.findFirstOrThrow({where : { id : userId}});
    const rutaImagen = path.join(__dirname, '../../../uploads/img', user.url_img);
    //console.log(rutaImagen);

    // Verificar si la imagen existe
    if (!fs.existsSync(rutaImagen)) {
      return res.status(404).send('Imagen no encontrada');
    }

    // Establecer el tipo de contenido de la respuesta como imagen
    res.setHeader('Content-Type', 'image/jpeg');

    // Leer la imagen y enviarla como respuesta
    fs.createReadStream(rutaImagen).pipe(res);
  }




}
