import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module'; // Asegúrate de importar AppModule desde la ruta correcta

describe('CalendarGraphicDataController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/calendar-graphic-data/:userId/:date (GET)', () => {
    const userId = '618920c2-24d4-475a-9853-724d1fd43856'; 
    const date = new Date().toISOString(); // Usa la fecha actual o una fecha válida
    return request(app.getHttpServer())
      .get(`/calendar-graphic-data/${userId}/${date}`)
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/)
      .expect((response) => {
        // Aquí puedes verificar la estructura de la respuesta o los datos devueltos según tu lógica de aplicación
        expect(response.body).toBeDefined();
      });
  });

  it('/calendar-graphic-data/:userId/:date (GET)', () => {
    const userId = '618920c2-24d4-475a-9853-724d1fd43856'; 
    return request(app.getHttpServer())
      .get(`/calendar-graphic-data/${userId}/2024-01-01`)
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/)
      .expect((response) => {
        // Aquí puedes verificar la estructura de la respuesta o los datos devueltos según tu lógica de aplicación
        expect(response.body).toBeDefined();
      });
  });

  it('/calendar-graphic-data/:userId/:date (GET)', () => {
    const userId = '618920c2-24d4-475a-9853-724d1fd43856'; 
    return request(app.getHttpServer())
      .get(`/calendar-graphic-data/${userId}/2024-05-09`)
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/)
      .expect((response) => {
        // Aquí puedes verificar la estructura de la respuesta o los datos devueltos según tu lógica de aplicación
        expect(response.body).toBeDefined();
      });
  });





});


