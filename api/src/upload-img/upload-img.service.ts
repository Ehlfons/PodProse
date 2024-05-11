import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as mime from 'mime-types';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadImgService {

    constructor(
        private readonly userService:  UsersService
    ){}

    async uploadFile(userId: string, file: any) {
        const fileName = file.filename;
        console.log(fileName);

        const mimeType = mime.lookup(file.originalname);
        console.log(mimeType)
        if (!mimeType || !mimeType.startsWith('image/') || mimeType.endsWith('/svg+xml') || mimeType.endsWith('/svgz+xml')) {

            const imagePath = path.join(__dirname, '..', '..', '..', 'uploads/img', fileName);
            try {
                fs.unlinkSync(imagePath);
                console.log(`Archivo ${fileName} eliminada correctamente.`);
              } catch (error) {
                console.error(`Error al eliminar la imagen ${fileName}:`, error);
              }

          throw new BadRequestException('El archivo subido no es una imagen válida.');
        }
        const response = await this.userService.updateUserImage(userId, fileName);
    
        return response;
      }
    



}
