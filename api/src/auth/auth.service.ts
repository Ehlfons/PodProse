import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { MailerService } from 'src/mailer/mailer.service';
import { v4 as uuidCreate } from 'uuid';
import { ValidateUserService } from 'src/validate-user/validate-user.service';
import { FailedLoginService } from 'src/failed-login/failed-login.service';
import { WorkersStatusService } from 'src/workers-status/workers-status.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly email: MailerService ,
    private readonly validate : ValidateUserService ,
    private readonly failedLoginService: FailedLoginService ,
    private readonly workerSatus : WorkersStatusService
  ) {}

  async register({ password, email, name , companyId , DNI , companyWorkdayId }: RegisterDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new BadRequestException('Ya existe un usuario con este correo electrónico');
      }

      const existingDNI = await this.prisma.user.findUnique({ where: { DNI } });
      if (existingDNI) {
        throw new BadRequestException('Ya existe un usuario con este DNI');
      }

      const existCompany = await this.prisma.company.findFirst({ where: { id: companyId } });
      if (!existCompany) {
        throw new BadRequestException('No se encontró la empresa especificada');
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
          companyId,
          DNI,
          companyWorkdayId,
          url_img: obtenerImagenAleatoria(),
        },
      });
      
      const verificationToken = await this.validate.addTokenVerification(user.id);

      await this.workerSatus.createStatus(user.id,user.companyId);
  
      await this.email.sendRegistrationEmail(email,name,verificationToken);
  
      return { message: 'Usuario creado correctamente' };

      return user;
    } catch (error) {
      throw new BadRequestException('Ha ocurrido un error al procesar el registro');
    }
  }



  
  
  async login({ email, password }: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        // Registra un intento fallido de inicio de sesión si las credenciales son incorrectas
        await this.failedLoginService.recordFailedAttempt(email);
        throw new UnauthorizedException('Email o contraseña incorrectos');
      }

      const payload = { email: user.email, sub: user.id };
      const access_token = this.jwtService.sign(payload);
      
      if (!access_token) {
        throw new UnauthorizedException('Error al generar el token de acceso');
      }


      await this.failedLoginService.clearFailedAttempts(email);

      return { access_token, user };
    } catch (error) {
      console.error("Problemitas iniciando sesión", error);
      throw error;
    }
  }

  async validateUserByToken(payload: any) {
    return await this.prisma.user.findUnique({ where: { email: payload.email } });
  }
}