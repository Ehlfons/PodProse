import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    // Si el email ha cambiado, actualizar el campo verificateAt
    if (updateUserDto.email) {
      await this.prisma.user.update({
        where: { id },
        data: { verificateAt: null },
      });
    }

    return user;
  }

  async remove(id: string) {
    const user = await this.prisma.user.findFirstOrThrow({ where: { id } });

    if (user.role === 'user') {
      await this.prisma.user.delete({ where: { id } });
      return { message: `User delete id ${user} ` };
    } else {
      return {
        message: `No se puede borrar un admin! Contacta con soporte técnico `,
      };
    }
  }

  async verifyUser(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { verificateAt: new Date() },
    });
  }

  generateVerificationToken(userId: string) {
    return this.jwtService.sign({ usuario_id: userId });
  }
}