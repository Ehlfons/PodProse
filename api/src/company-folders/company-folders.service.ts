import { Injectable } from '@nestjs/common';
import { CreateCompanyFolderDto } from './dto/create-company-folder.dto';
import { UpdateCompanyFolderDto } from './dto/update-company-folder.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Folder } from '@prisma/client';
import { CompanyFilesService } from 'src/company-files/company-files.service';

@Injectable()
export class CompanyFoldersService {
  constructor(
    private prisma: PrismaService,
    private files : CompanyFilesService
  ) {}

  async createFolder(createFolderDto: CreateCompanyFolderDto): Promise<Folder> {
    return this.prisma.folder.create({
      data: createFolderDto,
    });
  }

  async findFolderById(id: string): Promise<Folder | null> {
    return this.prisma.folder.findUnique({
      where: { id },
    });
  }

  async updateFolder(id: string, updateFolderDto : UpdateCompanyFolderDto): Promise<Folder | null> {
    return this.prisma.folder.update({
      where: { id },
      data: updateFolderDto,
    });
  }

  async deleteFolder(id: string): Promise<Folder | null> {

    const files = await this.files.findFilesByFolderId(id);

    files.map( async ( file ) => {
      await this.files.deleteFileFromUploads(file.name_file);
    });



    return this.prisma.folder.delete({
      where: { id },
    });
  }

  async findFoldersByCompanyId(companyId: string): Promise<Folder[]> {
    return this.prisma.folder.findMany({
      where: { companyId },
    });
  }
}
