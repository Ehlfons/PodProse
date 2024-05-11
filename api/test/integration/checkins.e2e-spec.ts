import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module'; // Asegúrate de importar AppModule desde la ruta correcta

describe('CheckinsController (e2e)', () => {
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

  //Inicia el dia
  it('/checkins/:userId/start-workday (POST)', () => {
    return request(app.getHttpServer())
      .post('/checkins/618920c2-24d4-475a-9853-724d1fd43856/start-workday') // Cambia '1' por un ID válido de usuario en tu base de datos
      .expect(HttpStatus.CREATED)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body.message).toEqual('A currar máquina');
      });
  });


  //Vuelve a iniciar el dia  no debe dejar
  it('/checkins/:userId/start-workday (POST)', () => {
    return request(app.getHttpServer())
      .post('/checkins/618920c2-24d4-475a-9853-724d1fd43856/start-workday') 
      .expect(HttpStatus.CREATED)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body.message).toEqual('Hoy ya has fichado. Qué esta pasando aquí?');
      });
  });


    //Inicia el dia con userId no existente
    it('/checkins/:userId/start-workday (POST)', () => {
      return request(app.getHttpServer())
        .post('/checkins/618920c2-24d4-475a-9853-72frff4d1fd43856/start-workday') // Cambia '1' por un ID válido de usuario en tu base de datos
        .expect(HttpStatus.CREATED)
        .expect('Content-Type', /json/)
        .expect((response) => {
          expect(response.body.message).toEqual('Fuera de aquí intruso');
        });
    });



//Iniciamos Pausa y funciona

  it('/checkins/:userId/pause-workday (POST)', () => {
    return request(app.getHttpServer())
      .post('/checkins/618920c2-24d4-475a-9853-724d1fd43856/pause-workday') 
      .expect(HttpStatus.CREATED)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body.message).toEqual('Tomando un descanso..');
      });
  });

  //Iniciamos Pausa y no nos deja funciona

  it('/checkins/:userId/pause-workday (POST)', () => {
    return request(app.getHttpServer())
      .post('/checkins/618920c2-24d4-475a-9853-724d1fd43856/pause-workday') 
      .expect(HttpStatus.CREATED)
      .expect('Content-Type', /json/)
      .expect((response) => {

        expect(response.body.message).toEqual('Por ahora no puedes irte a descansa...O igual ya estas descansando..');
      });
  });

//Volver a empezar a trabajar

  it('/checkins/:userId/restart-workday (POST)', () => {
    return request(app.getHttpServer())
      .post('/checkins/618920c2-24d4-475a-9853-724d1fd43856/restart-workday') 
      .expect(HttpStatus.CREATED)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body.message).toEqual('De vuelta los mandos de la nave');
      });
  });

//Volver a empezar a trabajar y no nos deja

  it('/checkins/:userId/restart-workday (POST)', () => {
    return request(app.getHttpServer())
      .post('/checkins/618920c2-24d4-475a-9853-724d1fd43856/restart-workday') 
      .expect(HttpStatus.CREATED)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body.message).toEqual('Para esto debes empezar a descansar..');
      });
  });

//Dejamos de trabajar

  it('/checkins/:userId/end-workday (POST)', () => {
    return request(app.getHttpServer())
      .post('/checkins/618920c2-24d4-475a-9853-724d1fd43856/end-workday') 
      .expect(HttpStatus.CREATED)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body.message).toEqual('A casa máquina');
      });
  });
//Dejamos de trabajar y no funciona

  it('/checkins/:userId/end-workday (POST)', () => {
    return request(app.getHttpServer())
      .post('/checkins/618920c2-24d4-475a-9853-724d1fd43856/end-workday') 
      .expect(HttpStatus.CREATED)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body.message).toEqual('Como te vas a ir si aun no has empezado? O igual sigues descandando');
      });
  });
  //Dejamos de trabajar con userId Incorrecto

  it('/checkins/:userId/end-workday (POST)', () => {
    return request(app.getHttpServer())
      .post('/checkins/618920c2-24d4-475a-9853-724d1fd43856/end-workday') 
      .expect(HttpStatus.CREATED)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body.message).toEqual('Como te vas a ir si aun no has empezado? O igual sigues descandando');
      });
  });

  //Recuperamos los datos del chekin

  it('/checkins/:userId/recover-checkin (GET)', () => {
    return request(app.getHttpServer())
      .get('/checkins/618920c2-24d4-475a-9853-724d1fd43856/recover-checkin') 
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/);
  });

   //Recuperamos los datos del chekin con userId inválido

   it('/checkins/:userId/recover-checkin (GET)', () => {
    return request(app.getHttpServer())
      .get('/checkins/618920c2-24d4-475a-9853-724d1fd43856/recover-checkin') 
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/);
  });


  //Recuperar data de una fecha

  it('/checkins/data/:userId/:date (GET)', () => {
    return request(app.getHttpServer())
      .get('/checkins/data/618920c2-24d4-475a-9853-724d1fd43856/2024-05-10') 
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/);
  });

  //User id invalido

  it('/checkins/data/:userId/:date (GET)', () => {
    return request(app.getHttpServer())
      .get('/checkins/data/618920c2-24d4-4ghgh75a-9853-724d1fd43856/2024-05-10')
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/);
  });

//Borrar los datos 
  it('/checkins/:userId/delete (GET)', () => {
    return request(app.getHttpServer())
      .delete('/checkins/618920c2-24d4-475a-9853-724d1fd43856/delete') //
      .expect(HttpStatus.OK);
  });

  //Borrar los datos  con userId incorrecto 
  it('/checkins/:userId/delete (GET)', () => {
    return request(app.getHttpServer())
      .delete('/checkins/618920c2-24d4-475a-9853-724d221fd43856/delete') //
      .expect(HttpStatus.OK);

  });
});
