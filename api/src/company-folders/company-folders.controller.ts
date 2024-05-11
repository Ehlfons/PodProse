import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CompanyFoldersService } from './company-folders.service';
import { CreateCompanyFolderDto } from './dto/create-company-folder.dto';
import { UpdateCompanyFolderDto } from './dto/update-company-folder.dto';
import { Folder } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Company Folders')
@Controller('company-folders')
export class CompanyFoldersController {
  constructor(private readonly folderService: CompanyFoldersService) {}

  @Post()
  async createCompanyFolder(@Body() createFolderDto: CreateCompanyFolderDto): Promise<Folder> {
    return this.folderService.createFolder(createFolderDto);
  }

  @Get(':id')
  async findFolderById(@Param('id') id: string): Promise<Folder | null> {
    return this.folderService.findFolderById(id);
  }

  @Put(':id')
  async updateFolder(@Param('id') id: string, @Body() updateFolderDto: UpdateCompanyFolderDto): Promise<Folder | null> {
    return this.folderService.updateFolder(id, updateFolderDto);
  }

  @Delete(':id')
  async deleteFolder(@Param('id') id: string): Promise<Folder | null> {
    return this.folderService.deleteFolder(id);
  }

  @Get('company/:companyId')
  async findFoldersByCompanyId(@Param('companyId') companyId: string): Promise<Folder[]> {
    return this.folderService.findFoldersByCompanyId(companyId);
  }
}
