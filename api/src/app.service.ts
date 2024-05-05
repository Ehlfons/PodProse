import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<h1>Trackow API</h1><footer><p>&copy; 2024 Trackow API. Todos los derechos reservados.</p></footer>`;
  }
}
