import { PartialType } from '@nestjs/swagger';
import { CreateCompanyVacationsYearDto } from './create-company-vacations-year.dto';

export class UpdateCompanyVacationsYearDto extends PartialType(CreateCompanyVacationsYearDto) {}
