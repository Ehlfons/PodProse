import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { CreateCompanyWorkdayDto } from './create-company-workday.dto';

export class UpdateCompanyWorkdayDto extends PartialType(CreateCompanyWorkdayDto) {
  @ApiProperty({ type: String, description: 'Nueva descripción de la jornada laboral', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
