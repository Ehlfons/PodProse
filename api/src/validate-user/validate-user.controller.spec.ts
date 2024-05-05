import { Test, TestingModule } from '@nestjs/testing';
import { ValidateUserController } from './validate-user.controller';
import { ValidateUserService } from './validate-user.service';

describe('ValidateUserController', () => {
  let controller: ValidateUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidateUserController],
      providers: [ValidateUserService],
    }).compile();

    controller = module.get<ValidateUserController>(ValidateUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
