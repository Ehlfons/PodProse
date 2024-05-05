import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { CompanyVacationsYearService } from './company-vacations-year.service';
import { CreateCompanyVacationsYearDto } from './dto/create-company-vacations-year.dto';
import { UpdateCompanyVacationsYearDto } from './dto/update-company-vacations-year.dto';

@Controller('company-vacations-year')
export class CompanyVacationsYearController {
  constructor(private readonly companyVacationsYearService: CompanyVacationsYearService) {}

  @Post()
  create(@Body(ValidationPipe) createCompanyVacationsYearDto: CreateCompanyVacationsYearDto) {
    return this.companyVacationsYearService.create(createCompanyVacationsYearDto);
  }

  @Get(':companyId')
  findAllByCompanyId( @Param('companyId') companyId : string) {
    return this.companyVacationsYearService.findAllByCompanyId(companyId);
  }

  @Get(':companyId/:year')
  findOneByCompanyIdYear(@Param('companyId') companyId: string , @Param('year') year: string) {
    return this.companyVacationsYearService.findOneByCompanyIdYear(companyId,year);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyVacationsYearDto: UpdateCompanyVacationsYearDto) {
    return this.companyVacationsYearService.update(+id, updateCompanyVacationsYearDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyVacationsYearService.remove(id);
  }
}
