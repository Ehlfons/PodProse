import { Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { DataCheckinsService } from './data-checkins.service';

@Controller('data-checkins')
export class DataCheckinsController {
  constructor(private readonly dataCheckinsService: DataCheckinsService) {}

  @Get(':userId/:startDate/:endDate')
  async addDataCheckins(@Param('userId') userId: string , @Param('startDate') startDate: Date , @Param('endDate') endDate: Date ){
      try {
          //const newCheckin = await this.dataCheckinsService.getDataUserByDate(userId,startDate,endDate);
          const newCheckin = await this.dataCheckinsService.getTotalHours(userId,startDate,endDate);

          return newCheckin;
      }catch(error){
          if(error instanceof NotFoundException) {
              return { message: error.message};
          }
          throw error;
      }
  }


}
