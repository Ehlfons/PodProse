import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { UpdateUserDto } from './dto/update-user.dto';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {} 

  async findAll() {
    return this.prisma.user.findMany(); 
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } }); 
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ 
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {

    const user = await this.prisma.user.findFirstOrThrow({ where: { id } });

    if ( user.role === "user") {
      await this.prisma.user.delete({ where: { id } });
      return { message : `User delete id ${user} `}; 
    }else {
      return { message : `No se puede borrar un admin! Contacta con soporte técnico `}; 
    }
    
  }

  async updateUserImage(userId:string , nameFile:string){

    const user = await this.prisma.user.findFirstOrThrow({where : { id : userId}} );

    const userImgName = user.url_img;

    if (!userImgName.startsWith("default")) {
      // Eliminar la imagen existente
      const imagePath = path.join(__dirname, '..', '..', '..', 'uploads', userImgName);      
      console.log(imagePath);
      try {
        fs.unlinkSync(imagePath);
        console.log(`Imagen ${userImgName} eliminada correctamente.`);
      } catch (error) {
        console.error(`Error al eliminar la imagen ${userImgName}:`, error);
      }
    }




    const userUpdate = await this.prisma.user.update({
      where : { id : userId},
      data : {
        url_img:nameFile
      }});
      return user ;
  }

}
