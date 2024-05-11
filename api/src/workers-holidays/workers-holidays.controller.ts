import { Controller, Get, Param } from '@nestjs/common';
import { WorkersHolidaysService } from './workers-holidays.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Vacaciones trabajadores')
@Controller('workers-holidays')
export class WorkersHolidaysController {
  constructor(private readonly workersHolidaysService: WorkersHolidaysService) {}

  @Get(':userId')
  async getHolidaysByUserId(@Param('userId') userId : string){
    return await this.workersHolidaysService.getHolidaysByUserId(userId);
  }


}
