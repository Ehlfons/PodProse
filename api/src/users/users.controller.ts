import { Controller, Get, Body, Patch, Param, Delete, ValidationPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnviarCorreoService } from '../auth/enviar-correo.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') uuid: string) {
    return await this.usersService.findOne(uuid);
  }

  @Patch(':id')
  async update(
    @Param('id') uuid: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(uuid, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') uuid: string) {
    return await this.usersService.remove(uuid);
  }
}