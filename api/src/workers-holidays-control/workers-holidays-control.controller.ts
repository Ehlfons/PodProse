import { Controller, Get, Param } from '@nestjs/common';
import { WorkersHolidaysControlService } from './workers-holidays-control.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Control Vacaciones Trabajadores')

@Controller('workers-holidays-control')
export class WorkersHolidaysControlController {
  constructor(private readonly workersHolidaysControlService: WorkersHolidaysControlService) {}

  @Get('resum-holidays-year/:userId/:year')
  async resumHolidays(@Param('userId') userId: string ,@Param('year') year: string){
    return this.workersHolidaysControlService.allDataVacationsByYear(year,userId);
  }

  @Get('previus-resum-holidays-year/:userId/:year/:starDate/:endDate')
  async previusResumHolidays(@Param('userId') userId: string ,@Param('year') year: string , @Param('starDate') starDate: Date , @Param('endDate') endDate: Date){
    return this.workersHolidaysControlService.preCalculateDate(year,userId , starDate , endDate);
  }


}
