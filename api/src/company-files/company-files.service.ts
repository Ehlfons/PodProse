import { Injectable } from '@nestjs/common';
import { CreateCompanyFileDto } from './dto/create-company-file.dto';
import { UpdateCompanyFileDto } from './dto/update-company-file.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CompanyFilesService {
  constructor(private prisma: PrismaService) {}

  async createFile(createCompanyFileDto : CreateCompanyFileDto ,file) {
    let fileName = "No Docs";
  if (file && file.filename) {
    fileName = file.filename;
  }
    const name_file = { name_file:fileName};

    const data = {...createCompanyFileDto,...name_file};

    return this.prisma.file.create({
      data: data,
    });
  }

  async findFileById(id: string) {
    return this.prisma.file.findUnique({
      where: { id },
    });
  }

  async updateFile(id: string, description) {
    return this.prisma.file.update({
      where: { id },
      data: description,
    });
  }

  async deleteFile(id: string) {
    const file = await this.findFileById(id);
    await this.deleteFileFromUploads(file.name_file)
    return this.prisma.file.delete({
      where: { id },
    });
  }

  async findFilesByFolderId(folderId: string) {
    return this.prisma.file.findMany({
      where: { folderId },
    });
  }

  async findFilesByUserAndFolder( folderId: string , userId: string) {
    
    const filesFolder = await this.findFilesByFolderId(folderId);
    console.log('FilesFolder',filesFolder);
    
    const filesCanAccess = await this.prisma.filesUsers.findMany({
      where : { userId : userId}
    })

    console.log('filesCanAccess',filesCanAccess);


    const accessibleFileIds = filesFolder
      .filter(fileFolder => filesCanAccess.some(fileCanAccess => fileCanAccess.fileId === fileFolder.id))
      .map(fileFolder => fileFolder.id);

    return accessibleFileIds;

  }

  async deleteFileFromUploads(name_file : string){

    const imagePath = path.join(__dirname, '..', '..', '..', 'uploads/docs', name_file);
    try {
      fs.unlinkSync(imagePath);
      console.log(`Archivo ${name_file} eliminada correctamente.`);
    } catch (error) {
      console.error(`Error al eliminar el archivo ${name_file}:`, error);
    }





  }
  
}
