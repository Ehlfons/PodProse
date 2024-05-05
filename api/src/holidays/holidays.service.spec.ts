import { Test, TestingModule } from '@nestjs/testing';
import { HolidaysService } from './holidays.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('HolidaysService', () => {
  let service: HolidaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HolidaysService , PrismaService],
    }).compile();

    service = module.get<HolidaysService>(HolidaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
