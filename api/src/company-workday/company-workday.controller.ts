import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { CompanyWorkdayService } from './company-workday.service';
import { CreateCompanyWorkdayDto } from './dto/create-company-workday.dto';
import { UpdateCompanyWorkdayDto } from './dto/update-company-workday.dto';

@Controller('company-workday')
export class CompanyWorkdayController {
  constructor(private readonly companyWorkdayService: CompanyWorkdayService) {}

  @Post()
  create(@Body(ValidationPipe) createCompanyWorkdayDto: CreateCompanyWorkdayDto) {
    return this.companyWorkdayService.create(createCompanyWorkdayDto);
  }

  @Get('/all-data/:companyId')
  async allWorkday(@Param('companyId') companyId : string){
    return await this.companyWorkdayService.allWorkdayByCompanyId(companyId);
  }


  @Get('/data-4-user/:companyId')
  async allData4User(@Param('companyId') companyId : string){
    return await this.companyWorkdayService.allWorkdayOnlyIdByCompanyId(companyId);
  }

  @Get(':userId/today')
  async todayWorkday(@Param('userId') userId : string){
    return await this.companyWorkdayService.todayWorkday(userId);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyWorkdayDto: UpdateCompanyWorkdayDto) {
    return this.companyWorkdayService.update(id, updateCompanyWorkdayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyWorkdayService.remove(id);
  }
}