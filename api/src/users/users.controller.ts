import { Controller, Get, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './guard/user-auth.guard';
import { Request } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
    return await this.usersService.update(uuid, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') uuid: string) {
    return await this.usersService.remove(uuid);
  }
}