import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, NotFoundException } from '@nestjs/common';
import * as request from 'supertest';
import { CheckinsController } from 'src/checkins/checkins.controller';
import { CheckinsService } from 'src/checkins/CheckinsService';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppModule } from 'src/app.module';


describe('CheckinsController (e2e)', () => {
  let app: INestApplication;
  let prisma : PrismaService;
  let checkinsService : CheckinsService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    checkinsService = moduleFixture.get<CheckinsService>(CheckinsService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should start workday for user', async () => {
    const userId = '00055bb2-17e5-42e4-b56c-ef03b2fd088f';

    // Simulamos que el servicio devuelve un checkin exitoso
    jest.spyOn(checkinsService, 'startWorkday').mockResolvedValueOnce({
      id: 'exampleCheckinId',
      userId: userId,
      checkIn: new Date(),
      type: 'start',
    });

    await request(app.getHttpServer())
      .post(`/checkins/${userId}/start-workday`)
      .expect(201)
      .expect({ message: 'A currar máquina' });
  });

  it('should handle NotFoundException when starting workday for user', async () => {
    const userId = '00055bb2-17e5-42e4-b56c-ef03b2fd088f';

    // Simulamos que el servicio lanza una NotFoundException
    jest.spyOn(checkinsService, 'startWorkday').mockRejectedValueOnce(new NotFoundException('User not found'));

    await request(app.getHttpServer())
      .post(`/checkins/${userId}/start-workday`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({ message: 'User not found' });
  });

  // Agrega casos de prueba similares para otros métodos de CheckinsController
});