import { Controller, Get, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './guard/user-auth.guard';
import { Request } from 'express';
import { EnviarCorreoService } from '../auth/enviar-correo.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly enviarCorreoService: EnviarCorreoService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() request: Request) {
    const user = request['user'];
    console.log('Usuario autenticado:', user);
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async findMe(@Req() request: Request) {
    const user = request['user'];
    return user;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') uuid: string) {
    return await this.usersService.findOne(uuid);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') uuid: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    // Obtén el usuario actual de la base de datos
    const currentUser = await this.usersService.findOne(uuid);

    // Actualiza el usuario
    const updatedUser = await this.usersService.update(uuid, updateUserDto);

    // Verifica si el correo ha cambiado
    if (updateUserDto.email && updateUserDto.email !== currentUser.email) {
      const token = this.usersService.generateVerificationToken(updatedUser.id);
      await this.enviarCorreoService.enviarCorreo(updateUserDto.email, updatedUser.username, token);
    }

    return updatedUser;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') uuid: string) {
    return await this.usersService.remove(uuid);
  }
}