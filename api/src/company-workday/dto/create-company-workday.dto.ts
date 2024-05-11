import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyWorkdayDto {
  @ApiProperty({ type: String, description: 'ID de la empresa' })
  @IsString()
  companyId: string;

  @ApiProperty({ type: String, description: 'Descripción de la jornada laboral' })
  @IsString()
  description: string;
}
