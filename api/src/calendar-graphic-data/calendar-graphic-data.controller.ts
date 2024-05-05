import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CalendarGraphicDataService } from './calendar-graphic-data.service';


@Controller('calendar-graphic-data')
export class CalendarGraphicDataController {
  constructor(private readonly calendarGraphicDataService: CalendarGraphicDataService) {}

  @Get(':userId/:date')
  async knowWork(@Param('userId') userId : string , @Param('date') date : Date){
    const result = await this.calendarGraphicDataService.findDayByDateAndUserId( date ,userId);
    return result;
  }



}
