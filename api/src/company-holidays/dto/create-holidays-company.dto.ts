import { IsArray, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class HolidayDto {
  @ApiProperty({ type: String, description: 'Fecha del día festivo', format: 'date', example: '2024-12-25' })
  date: string;

  @ApiProperty({ type: String, description: 'Tipo de día festivo', example: 'Navidad' })
  type: string;

  @ApiProperty({ type: String, description: 'Descripción del día festivo', example: 'Día de Navidad' })
  description: string;
}

export class CreateHolidaysCompanyDto {
  @ApiProperty({
    type: [HolidayDto],
    description: 'Array de días festivos de la empresa (mínimo 1, máximo 10)',
    example: [{ date: '2024-12-25', type: 'Navidad', description: 'Día de Navidad' }],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  days: HolidayDto[];
}

