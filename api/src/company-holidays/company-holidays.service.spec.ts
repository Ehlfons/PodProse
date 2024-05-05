import { Test, TestingModule } from '@nestjs/testing';
import { HolidaysCompanyService } from './company-holidays.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('FestivosEmpresaService', () => {
  let service: HolidaysCompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HolidaysCompanyService , PrismaService],
    }).compile();

    service = module.get<HolidaysCompanyService>(HolidaysCompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
