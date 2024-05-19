import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  Logger
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidCreate } from 'uuid';
import { EnviarCorreoService } from './enviar-correo.service';
import { ValidateUserService } from 'src/validate-user/validate-user.service';
import { FailedLoginService } from 'src/failed-login/failed-login.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly validate: ValidateUserService,
    private readonly failedLoginService: FailedLoginService,
    private readonly enviarCorreoService: EnviarCorreoService,
    private readonly usersService: UsersService,
  ) {}

  async register({ password, email, name, username }: RegisterDto) {
    try {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email },
      });
      if (existingEmail) {
        throw new BadRequestException(
          'Ya existe un usuario con este correo electrónico',
        );
      }

      const existingUsername = await this.prisma.user.findUnique({
        where: { username },
      });

      if (existingUsername) {
        throw new BadRequestException(
          'Ya existe un usuario con este nombre de usuario',
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      function obtenerImagenAleatoria(): string {
        const numero = Math.floor(Math.random() * 5) + 1;
        return `default${numero}.png`;
      }

      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          username,
          url_img: obtenerImagenAleatoria(),
        },
      });

      const token = this.jwtService.sign({ usuario_id: user.id });
      await this.enviarCorreoService.enviarCorreo(email, username, token);

      return { message: 'Usuario creado correctamente. Por favor, verifica tu correo electrónico.' };
    } catch (error) {
      throw new BadRequestException(
        Logger.error(`Error al procesar el registro: ${error.message}`, error.stack, 'AuthService'),
      );
    }
  }

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        await this.failedLoginService.recordFailedAttempt(email);
        throw new UnauthorizedException('Email o contraseña incorrectos');
      }

      if (!user.verificateAt) {
        throw new UnauthorizedException('Por favor verifica tu correo electrónico antes de iniciar sesión.');
      }

      const payload = { email: user.email, sub: user.id };
      const access_token = this.jwtService.sign(payload);

      if (!access_token) {
        throw new UnauthorizedException('Error al generar el token de acceso');
      }

      await this.failedLoginService.clearFailedAttempts(email);

      return { access_token, user };
    } catch (error) {
      console.error('Problemitas iniciando sesión', error);
      throw error;
    }
  }

  async validateUserByToken(payload: any) {
    return await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
  }

  async verifyUser(userId: string) {
    return this.usersService.verifyUser(userId);
  }
}