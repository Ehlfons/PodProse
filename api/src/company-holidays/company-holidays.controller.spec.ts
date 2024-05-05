import { Test, TestingModule } from '@nestjs/testing';
import { HolidaysCompanyController } from './company-holidays.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { HolidaysCompanyService } from './company-holidays.service';
import { JwtService } from '@nestjs/jwt';

describe('HolidaysCompanyController', () => {
  let controller: HolidaysCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HolidaysCompanyController],
      providers: [
        UsersService,
        PrismaService,
        HolidaysCompanyService,
        JwtService
    ]
    }).compile();

    controller = module.get<HolidaysCompanyController>(HolidaysCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
