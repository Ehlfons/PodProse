import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  //Cargar el archivo .env
  dotenv.config();

  //Carga la app
  const app = await NestFactory.create(AppModule);

  //Crear la documentacion del swagger

  const config = new DocumentBuilder()
    .setTitle(`Podprose API`)
    .setDescription(`Documentacion de la API de Podprose`)
    .setVersion(`1.0`)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Configuración de CORS
  const corsOptions: CorsOptions = {
    origin: '*', // Cambia esto según el origen de tu frontend en producción
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true, // Habilita las credenciales de CORS (si tu frontend las usa)
  };

  app.enableCors(corsOptions);

  await app.listen(3000);
}
bootstrap();
