import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { CompanyWorkdayService } from './company-workday.service';
import { CreateCompanyWorkdayDto } from './dto/create-company-workday.dto';
import { UpdateCompanyWorkdayDto } from './dto/update-company-workday.dto';
import { CreateWorkdayDto } from './dto/create-workday.dto';
import { UpdateWorkdayDto } from './dto/update-workday.dto';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';

@ApiTags('CompanyWorkday && Workday')
@Controller('company-workday')
export class CompanyWorkdayController {
  constructor(private readonly companyWorkdayService: CompanyWorkdayService) {}

  @Post()
  @ApiOperation({ summary: 'Crear CompanyWorkday' })
  @ApiBody({ description: 'Crear CompanyWorkday', type: CreateCompanyWorkdayDto })
  async create(@Body(ValidationPipe) createCompanyWorkdayDto: CreateCompanyWorkdayDto) {
    return await this.companyWorkdayService.createCompanyWorkday(createCompanyWorkdayDto);
  }

  @Post('workday')
  createWorkday(@Body(ValidationPipe) createWorkdayDto : CreateWorkdayDto) {
    return this.companyWorkdayService.createWorkday(createWorkdayDto);
  }

  @Get('/all-data/:companyId')
  async allWorkday(@Param('companyId') companyId : string){
    return await this.companyWorkdayService.allWorkdayByCompanyId(companyId);
  }

  @Get('/all-data/workday/:companyWorkdayId')
  async allWorkdayByCompanyWorkdayId(@Param('companyWorkdayId') companyWorkdayId : string){
    return await this.companyWorkdayService.allWorkdayByCompanyWorkdayId(companyWorkdayId);
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
  update(@Param('id') id: string, @Body(ValidationPipe) updateCompanyWorkdayDto: UpdateCompanyWorkdayDto) {
    return this.companyWorkdayService.updateCompanyWorkday(id, updateCompanyWorkdayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyWorkdayService.removeCompanyWorkday(id);
  }


  @Patch('workday/:id')
  updateWorkdat(@Param('id') id: string, @Body(ValidationPipe) updateWorkdayDto: UpdateWorkdayDto) {
    return this.companyWorkdayService.updateWorkday(id, updateWorkdayDto);
  }

  @Delete('workday/:id')
  removeWorkday(@Param('id') id: string) {
    return this.companyWorkdayService.removeWorkday(id);
  }
}