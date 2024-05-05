import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyService } from './company.service';

describe('CompanyController', () => {
  let controller: CompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [ PrismaService , CompanyService]
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
