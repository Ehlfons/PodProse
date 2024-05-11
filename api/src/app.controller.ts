import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('APP WEB')

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHtml(): string {
    return this.appService.getHtml();
  }
  @Get('HelloWorld')
  getHello(): string {
    return this.appService.getHello();
  }
}
