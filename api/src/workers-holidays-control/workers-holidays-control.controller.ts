import { Controller, Get, Param } from '@nestjs/common';
import { WorkersHolidaysControlService } from './workers-holidays-control.service';

@Controller('workers-holidays-control')
export class WorkersHolidaysControlController {
  constructor(private readonly workersHolidaysControlService: WorkersHolidaysControlService) {}

  @Get('resum-holidays-year/:userId/:year')
  async resumHolidays(@Param('userId') userId: string ,@Param('year') year: string){
    return this.workersHolidaysControlService.allDataVacationsByYear(year,userId);
  }


}
