import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service'; // Importa PrismaService
import { Request } from 'express';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      return false;
    }

    try {
      const decodedToken = this.jwtService.decode(token);
      const userId = decodedToken.sub;

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user || user.role !== "admin" ) {
        return false;
      }else {
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}