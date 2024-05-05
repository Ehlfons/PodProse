import { Controller, Get, Param } from '@nestjs/common';
import { WorkersHolidaysService } from './workers-holidays.service';

@Controller('workers-holidays')
export class WorkersHolidaysController {
  constructor(private readonly workersHolidaysService: WorkersHolidaysService) {}

  @Get(':userId')
  async getHolidaysByUserId(@Param('userId') userId : string){
    return await this.workersHolidaysService.getHolidaysByUserId(userId);
  }


}
