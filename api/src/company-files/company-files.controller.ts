import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CompanyFilesService } from './company-files.service';
import { CreateCompanyFileDto } from './dto/create-company-file.dto';
import { UpdateCompanyFileDto } from './dto/update-company-file.dto';
import * as mime from 'mime-types';
import * as fs from 'fs';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Company Files')

@Controller('company-files')
export class CompanyFilesController {
  constructor(private readonly companyFilesService: CompanyFilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/docs',
      filename: (req, file, callback) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return callback(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async createFile(@UploadedFile() file ,@Body() createCompanyFileDto: CreateCompanyFileDto) {
    return this.companyFilesService.createFile(createCompanyFileDto , file);
  }

  @Get(':id')
  async findFileById(@Param('id') id: string) {
    return this.companyFilesService.findFileById(id);
  }

  @Put(':id')
  async updateFile(@Param('id') id: string, @Body() description) {
    return this.companyFilesService.updateFile(id, description);
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: string) {
    return this.companyFilesService.deleteFile(id);
  }

  @Get('folder/:folderId')
  async findFilesByFolderId(@Param('folderId') folderId: string) {
    return this.companyFilesService.findFilesByFolderId(folderId);
  }

  @Get('files-can-user/:folderId/:userId')
  async findFilesByUserAndFolder(@Param('folderId') folderId: string , @Param('userId') userId: string) {
    return this.companyFilesService.findFilesByUserAndFolder(folderId , userId);
  }
}
