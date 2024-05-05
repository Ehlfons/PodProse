import { Controller } from '@nestjs/common';
import { FailedLoginService } from './failed-login.service';

@Controller('failed-login')
export class FailedLoginController {
  constructor(private readonly failedLoginService: FailedLoginService) {}
}
