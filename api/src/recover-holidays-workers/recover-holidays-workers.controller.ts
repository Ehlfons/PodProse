import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { RecoverHolidaysWorkersService } from './recover-holidays-workers.service';

@Controller('recover-holidays-workers')
export class RecoverHolidaysWorkersController {
  constructor(private readonly recoverHolidaysWorkersService: RecoverHolidaysWorkersService) {}

  @Get(':userId')
  async getHolidaysByUserId(@Param('userId') userId : string ){
    try {
      const allHolidays = await this.recoverHolidaysWorkersService.getAllDataByUserId(userId);
      return allHolidays;
  }catch(error){
      if(error instanceof NotFoundException) {
          return { message: error.message};
      }
      throw error;
  }
  }


}
