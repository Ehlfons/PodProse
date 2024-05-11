import { IsString, IsInt, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyVacationsYearDto {
  @ApiProperty({ type: String, description: 'ID de la empresa', readOnly: true })
  @IsString()
  readonly companyId: string;

  @ApiProperty({ type: Number, description: 'Número de días de vacaciones', readOnly: true })
  @IsInt()
  readonly numberDays: number;

  @ApiProperty({ 
    type: String, 
    description: 'Año para el que se definen las vacaciones (formato AAAA)', 
    minLength: 4, 
    maxLength: 4, 
    readOnly: true 
  })
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  readonly year: string;
}
