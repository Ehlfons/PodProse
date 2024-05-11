import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module'; 

describe('WorkersHolidaysControlController (e2e)', () => {
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

  it('/workers-holidays-control/resum-holidays-year/:userId/:year (GET)', () => {
    const userId = '618920c2-24d4-475a-9853-724d1fd43856'; // Reemplaza 'userId' con un valor válido
    const year = '2024'; // Reemplaza '2024' con el año deseado
    return request(app.getHttpServer())
      .get(`/workers-holidays-control/resum-holidays-year/${userId}/${year}`)
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/)
      .expect((response) => {
        // Aquí puedes verificar la estructura de la respuesta o los datos devueltos según tu lógica de aplicación
        expect(response.body).toBeDefined();
      });
  });

  it('/workers-holidays-control/previus-resum-holidays-year/:userId/:year/:starDate/:endDate (GET)', () => {
    const userId = '618920c2-24d4-475a-9853-724d1fd43856'; // Reemplaza 'userId' con un valor válido
    const year = '2024'; // Reemplaza '2024' con el año deseado
    const startDate = new Date().toISOString(); // Usa la fecha actual o una fecha válida
    const endDate = new Date().toISOString(); // Usa la fecha actual o una fecha válida
    return request(app.getHttpServer())
      .get(`/workers-holidays-control/previus-resum-holidays-year/${userId}/${year}/${startDate}/${endDate}`)
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/)
      .expect((response) => {
        // Aquí puedes verificar la estructura de la respuesta o los datos devueltos según tu lógica de aplicación
        expect(response.body).toBeDefined();
      });
  });
});
