import { Test, TestingModule } from '@nestjs/testing';
import { HolidaysController } from './holidays.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HolidaysService } from './holidays.service';
import { JwtService } from '@nestjs/jwt';

describe('FestivosController', () => {
  let controller: HolidaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HolidaysController],
      providers: [HolidaysService , PrismaService , JwtService]
    }).compile();

    controller = module.get<HolidaysController>(HolidaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
