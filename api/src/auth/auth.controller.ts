import { Controller, Post, Body, UnauthorizedException, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Registrar y Login')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService ,
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
}

