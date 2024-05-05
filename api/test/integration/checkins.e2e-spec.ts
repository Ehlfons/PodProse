import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CheckinsController } from 'src/checkins/checkins.controller';
import { CheckinsService } from 'src/checkins/checkins.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppModule } from 'src/app.module';


describe('CheckinsController (e2e)', () => {
  let app: INestApplication;
  let prisma : PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should start workday for user', async () => {
    const userId = 'exampleUserId';

    await request(app.getHttpServer())
      .post(`/checkins/${userId}/start-workday`)
      .expect(201)
      .expect({ message: 'Fuera de aquí intruso' });
      
  });

  it('should end workday for user', async () => {
    const userId = 'exampleUserId';

    await request(app.getHttpServer())
      .post(`/checkins/${userId}/end-workday`)
      .expect(201)
      .expect({ message: 'Fuera de aquí intruso' });
  });

  it('should pause workday for user', async () => {
    const userId = 'exampleUserId';

    await request(app.getHttpServer())
      .post(`/checkins/${userId}/pause-workday`)
      .expect(201)
      .expect({ message: 'Fuera de aquí intruso' });
  });

  it('should restart workday for user', async () => {
    const userId = 'exampleUserId';

    await request(app.getHttpServer())
      .post(`/checkins/${userId}/restart-workday`)
      .expect(201)
      .expect({ message: 'Fuera de aquí intruso' });

  });

  it('should recover checkin for user', async () => {
    const userId = 'exampleUserId';

    await request(app.getHttpServer())
      .get(`/checkins/${userId}/recover-checkin`)
      .expect(HttpStatus.OK); // Assuming recoverCheckIn returns the checkin data
  });
});
