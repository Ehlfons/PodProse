import { Injectable, Logger } from '@nestjs/common';
import * as cron from 'node-cron';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor() {
    // Ejemplo de ejecución de una función a las 8:00 AM todos los días
    cron.schedule('58 13 * * *', () => {
      this.runScheduledTask();
    });
  }

  private runScheduledTask() {
    // Coloca aquí la lógica que deseas ejecutar en el horario especificado
    this.logger.log('Ejecutando tarea cron...');
    console.log("Recoge que nos vamosssssssssss");
  }
}
