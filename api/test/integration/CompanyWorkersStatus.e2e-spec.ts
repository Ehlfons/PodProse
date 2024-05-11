import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module'; // Asegúrate de importar AppModule desde la ruta correcta

describe('CompanyStatusWorkersController (e2e)', () => {
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

  it('/company-status-workers/:companyId/:date (GET)', () => {
    const companyId = '803ecc0f-cdea-446f-961b-567dac673986'; // Reemplaza 'companyId' con un valor válido
    const date = new Date().toISOString(); // Usa la fecha actual o una fecha válida
    return request(app.getHttpServer())
      .get(`/company-status-workers/${companyId}/${date}`)
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/)
      .expect((response) => {
        // Aquí puedes verificar la estructura de la respuesta o los datos devueltos según tu lógica de aplicación
        expect(response.body).toBeDefined();
      });
  });

  //Vacaciones
  it('/company-status-workers/:companyId/:date (GET)', () => {
    const companyId = '803ecc0f-cdea-446f-961b-567dac673986'; // Reemplaza 'companyId' con un valor válido
    const date = new Date('2024-05-09').toISOString(); // Usa la fecha actual o una fecha válida
    return request(app.getHttpServer())
      .get(`/company-status-workers/${companyId}/${date}`)
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/)
      .expect((response) => {
        // Aquí puedes verificar la estructura de la respuesta o los datos devueltos según tu lógica de aplicación
        expect(response.body).toBeDefined();
      });
  });

  it('/company-status-workers/:companyId/:date (GET)', () => {
    const companyId = '803ecc0f-cdea-446f-961b-567dac673986'; // Reemplaza 'companyId' con un valor válido
    const date = new Date('2024-05-10').toISOString(); // Usa la fecha actual o una fecha válida
    return request(app.getHttpServer())
      .get(`/company-status-workers/${companyId}/${date}`)
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/)
      .expect((response) => {
        // Aquí puedes verificar la estructura de la respuesta o los datos devueltos según tu lógica de aplicación
        expect(response.body).toBeDefined();
      });
  });

  //Futuro
  it('/company-status-workers/:companyId/:date (GET)', () => {
    const companyId = '803ecc0f-cdea-446f-961b-567dac673986'; // Reemplaza 'companyId' con un valor válido
    let date = new Date('2026-05-05').toISOString(); // Usa la fecha actual o una fecha válida
    return request(app.getHttpServer())
      .get(`/company-status-workers/${companyId}/${date}`)
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/)
      .expect((response) => {
        // Aquí puedes verificar la estructura de la respuesta o los datos devueltos según tu lógica de aplicación
        expect(response.body).toBeDefined();
      });
  });

//Pasado
  it('/company-status-workers/:companyId/:date (GET)', () => {
    const companyId = '803ecc0f-cdea-446f-961b-567dac673986'; // Reemplaza 'companyId' con un valor válido
    let date = new Date('2023-05-06').toISOString(); // Usa la fecha actual o una fecha válida
    return request(app.getHttpServer())
      .get(`/company-status-workers/${companyId}/${date}`)
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/)
      .expect((response) => {
        // Aquí puedes verificar la estructura de la respuesta o los datos devueltos según tu lógica de aplicación
        expect(response.body).toBeDefined();
      });
  });




});
