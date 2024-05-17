import { Controller, Post, Body, UnauthorizedException, ValidationPipe, Get, Param, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@ApiTags('Registrar y Login')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body(ValidationPipe) registerDto: RegisterDto) {
    await this.authService.register(registerDto);
    return { message: 'Usuario registrado correctamente. Por favor, verifica tu correo electrónico.' };
  }

  @Get('verify/:token')
  async verifyEmail(@Param('token') token: string, @Res() res: Response) {
    try {
      const payload = this.jwtService.verify(token);
      await this.authService.verifyUser(payload.usuario_id);
      return res.redirect('http://localhost:5173');
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
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
}