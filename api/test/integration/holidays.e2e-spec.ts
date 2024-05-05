import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

describe('HolidaysController (e2e)', () => {
  let app: INestApplication;
  let prisma : PrismaService;
  let authToken : string ;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prisma = moduleFixture.get<PrismaService>(PrismaService);

    // Generar un token JWT válido para utilizar en las pruebas
    const userData = {
      userId: '123456789', 
      email: 'usuario@example.com', 
    };

    const secretKey = 'trackowkeyapi'; 
    authToken = jwt.sign(userData, secretKey, { expiresIn: '1h' });

  });

  afterAll( async () => {
    await app.close();
  })


  it('/holidays/provinces (GET)', () => {
    return request(app.getHttpServer())
      .get('/holidays/provinces')
      .set('Authorization', `Bearer ${authToken}`) // Establecer el token JWT en el encabezado de autorización
      .expect(200)
      .expect((response) => {
        // Verificar el formato de la respuesta si es necesario
        // Por ejemplo, si esperas que la respuesta sea un array de objetos
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
      });
  });

  it('/holidays/:province/localities (GET)', () => {
    const province = 'Alicante';

    return request(app.getHttpServer())
      .get(`/holidays/${province}/localities`)
      .set('Authorization', `Bearer ${authToken}`) // Establecer el token JWT en el encabezado de autorización
      .expect(200)
      .expect((response) => {
        // Verificar el formato de la respuesta si es necesario
        // Por ejemplo, si esperas que la respuesta sea un array de objetos
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
      });
  });

  it('/holidays/days (GET)', () => {
    return request(app.getHttpServer())
      .get('/holidays/days')
      .set('Authorization', `Bearer ${authToken}`) // Establecer el token JWT en el encabezado de autorización
      .query({ withNationals: 'true', locality: 'ELDA', province: 'example_province' })
      .expect(200)
      .expect((response) => {
        // Verificar el formato de la respuesta si es necesario
        // Por ejemplo, si esperas que la respuesta sea un array de objetos
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
      });
  });

});
