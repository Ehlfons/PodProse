import { Controller, Post, Body, UnauthorizedException, Get, Request, UseGuards  , InternalServerErrorException, ExecutionContext, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request as ExpressRequest } from 'express'; // Importa Request de Express
import { UsersService } from 'src/users/users.service';
import { AuthAdminGuard } from './guard/authAdmin.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Registrar y Login')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService ,
    private readonly prisma: PrismaService ,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService, 
  ) {}

  @Post('register')
  async register(@Body(ValidationPipe) registerDto: RegisterDto) {
    await this.authService.register(registerDto);
    return { message: 'Usuario registrado correctamente' };
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    const loginResult = await this.authService.login(loginDto);
    if (!loginResult || !loginResult.access_token) {
      throw new UnauthorizedException('Contraseña o email incorrecto');
    }
    const { access_token, user } = loginResult;
    return { access_token, user };
  }

  @Get('onlyAdmin')
  @UseGuards(AuthAdminGuard)
  async onlyAdmin() {
    return true;
  }
}

