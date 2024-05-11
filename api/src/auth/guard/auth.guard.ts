import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service'; // Importa PrismaService
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('Estas dentro amigo');
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    console.log(token);
    
    if (!token) {
      console.log("ta luego");
      return false;
    }

    try {
      const decodedToken = this.jwtService.decode(token);
      console.log(`Estas dentro ; ${decodedToken}`);
      const userId = decodedToken.sub;
      console.log(userId);

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      console.log(user);

      if (!user) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}