import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FailedLoginService } from 'src/failed-login/failed-login.service';

@Injectable()
export class BruteForceMiddleware implements NestMiddleware {
  constructor(private readonly failedLoginService: FailedLoginService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log("Estás dentro del middleware");
    const username = req.body.email; // Suponiendo que el nombre de usuario está en el campo "email" del cuerpo de la solicitud
    console.log(username);
    const maxAttempts = 3;

    const lockoutPeriod =  20 * 1000; // 20 segundos en milisegundos

    //const lockoutPeriod = 15 * 60 * 1000; // 15 minutos en milisegundos

    try {
      const failedAttempts = await this.failedLoginService.getFailedAttempts(username);
      console.log(failedAttempts);

      const lastAttempt = await this.failedLoginService.getFailedTime(username);
      console.log(lastAttempt);

      if (failedAttempts >= maxAttempts && lastAttempt) {
        const lastAttemptTime = new Date(lastAttempt.createdAt).getTime();
        console.log(lastAttemptTime);
        if (Date.now() - lastAttemptTime < lockoutPeriod) {
          // La cuenta está bloqueada temporalmente
          return res.status(203).json({ message: 'La cuenta está bloqueada temporalmente. Inténtalo de nuevo más tarde.' });
        } else {
          // Reiniciar los intentos fallidos si ha pasado el período de bloqueo
          console.log("Lo reinicio todo brotheerrr");
          await this.failedLoginService.clearFailedAttempts(username);
        }
      }
    } catch (error) {
      console.error("Error al verificar los intentos fallidos de inicio de sesión:", error);
      // Manejar el error de manera adecuada, posiblemente devolviendo un error interno del servidor (500)
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    next();
  }
}
