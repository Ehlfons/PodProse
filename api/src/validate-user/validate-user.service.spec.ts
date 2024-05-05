import { Test, TestingModule } from '@nestjs/testing';
import { ValidateUserService } from './validate-user.service';

describe('ValidateUserService', () => {
  let service: ValidateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateUserService],
    }).compile();

    service = module.get<ValidateUserService>(ValidateUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
