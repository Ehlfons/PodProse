import { Controller, Get, Param } from '@nestjs/common';
import { ValidateUserService } from './validate-user.service';

@Controller('validate-user')
export class ValidateUserController {
  constructor(private readonly validateUserService: ValidateUserService) {}


  @Get(':token')
  async verificateUserByToken(@Param('token') token: string): Promise<string> {
    return this.validateUserService.verificateUserByToken(token);
  }


  
}
