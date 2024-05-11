import { Controller, Get, NotFoundException, Param , Res } from '@nestjs/common';
import { DocsService } from './docs.service';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Get(':nombreDocs')
  async verDocumento(@Param('nombreDocs') nombreDocs: string, @Res() res: Response) {
    // Ruta donde se almacenan los documentos
    const rutaDocumento = path.join(__dirname, '../../../uploads/docs', nombreDocs);

    try {
      // Verificar si el documento existe
      if (!fs.existsSync(rutaDocumento)) {
        throw new NotFoundException('Documento no encontrado');
      }

      // Establecer el tipo de contenido de la respuesta según la extensión del documento
      const extension = path.extname(nombreDocs).toLowerCase();
      let contentType = 'application/octet-stream'; // Tipo de contenido por defecto
      if (extension === '.pdf') {
        contentType = 'application/pdf';
      } else if (extension === '.docx') {
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      } else if (extension === '.jpg' || extension === '.jpeg') {
        contentType = 'image/jpeg';
      } else if (extension === '.png') {
        contentType = 'image/png';
      }

      // Establecer el tipo de contenido de la respuesta
      res.setHeader('Content-Type', contentType);

      // Leer el documento y enviarlo como respuesta
      fs.createReadStream(rutaDocumento).pipe(res);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send('Documento no encontrado');
      } else {
        return res.status(500).send('Error interno del servidor');
      }
    }
  }
}