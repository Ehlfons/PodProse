import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module'; // Asegúrate de importar AppModule desde la ruta correcta

describe('AuthController (e2e)', () => {
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

  it('/auth/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name:"create",
        email:"pruebas@pruebas.com",
        password:"1234",
        DNI:"20098075P",
        companyId:"803ecc0f-cdea-446f-961b-567dac673986",
        companyWorkdayId:"e72bbce9-fcc3-47a9-9f06-44d348bd89be"
       })
      .expect(HttpStatus.BAD_REQUEST);
      // .expect('Content-Type', /json/) 
      // .expect((response) => {
      //   console.log(response);
      //   expect(response.body.message).toEqual('Usuario registrado correctamente');
      // });
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email:"user@user.com",
        password:"1234"
      })
      .expect(HttpStatus.CREATED)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body.access_token).toBeDefined();
        expect(response.body.user).toBeDefined();
      });
  });

  it('/auth/onlyAdmin (GET)', () => {
    return request(app.getHttpServer())
      .get('/auth/onlyAdmin')
      .expect(HttpStatus.FORBIDDEN);
     
  });
});


