import { Controller, Get, Param } from '@nestjs/common';
import { KnowWorkService } from './know-work.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Saber si trabaja')
@Controller('know-work')
export class KnowWorkController {
  constructor(private readonly knowWorkService: KnowWorkService) {}


  @Get(':userId/:date')
  async knowWork(@Param('userId') userId : string , @Param('date') date : Date){
    const result = await this.knowWorkService.knowWorkByUserId(userId, date);
    return result;
  }
}
