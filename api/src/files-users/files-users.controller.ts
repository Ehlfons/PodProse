
import { Controller, Post, Body, Delete, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FilesUsersService } from './files-users.service';
import { CreateFilesUsersDto } from './dto/create-files-user.dto';
import { CreateFilesArrayUsersDto } from './dto/create-files-array-users.dto'; 
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Relacion Files | Users')

@Controller('files-users')
export class FilesUsersController {
  constructor(private readonly filesUsersService: FilesUsersService) {}

  @Post()
  async createFilesUsers(@Body() createFilesArrayUsersDto: CreateFilesArrayUsersDto) {
    return this.filesUsersService.createFilesArrayUsers(createFilesArrayUsersDto);
  }

  @Post(':fileId')
  async getUsers(@Param('fileId') fileId : string ) {
    return this.filesUsersService.getUsersByFileId(fileId);
  }

  @Delete(':id')
  async deleteFilesUsers(@Param('id') id: string) {
    return this.filesUsersService.deleteFilesUsers(id);
  }
}
