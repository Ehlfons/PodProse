import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsInt, Min, Max } from 'class-validator';
import { CreateWorkdayDto } from './create-workday.dto';

export class UpdateWorkdayDto extends PartialType(CreateWorkdayDto) {
  @ApiProperty({ type: String, description: 'Hora de inicio para el lunes', required: false })
  monday?: string | null;

  @ApiProperty({ type: String, description: 'Hora de inicio para el martes', required: false })
  tuesday?: string | null;

  @ApiProperty({ type: String, description: 'Hora de inicio para el miércoles', required: false })
  wednesday?: string | null;

  @ApiProperty({ type: String, description: 'Hora de inicio para el jueves', required: false })
  thursday?: string | null;

  @ApiProperty({ type: String, description: 'Hora de inicio para el viernes', required: false })
  friday?: string | null;

  @ApiProperty({ type: String, description: 'Hora de inicio para el sábado', required: false })
  saturday?: string | null;

  @ApiProperty({ type: String, description: 'Hora de inicio para el domingo', required: false })
  sunday?: string | null;

  @ApiProperty({ type: String, description: 'Nueva descripción de la jornada laboral', required: false })
  @IsString()
  description?: string;

  @ApiProperty({ type: Number, description: 'Nuevo día de inicio', required: false })
  @IsInt()
  @Min(0)
  @Max(31)
  dayStart?: number;

  @ApiProperty({ type: Number, description: 'Nuevo día de finalización', required: false })
  @IsInt()
  @Min(0)
  @Max(31)
  dayEnd?: number;

  @ApiProperty({ type: Number, description: 'Nuevo mes de inicio', required: false })
  @IsInt()
  @Min(0)
  @Max(12)
  monthStart?: number;

  @ApiProperty({ type: Number, description: 'Nuevo mes de finalización', required: false })
  @IsInt()
  @Min(0)
  @Max(12)
  monthEnd?: number;
}
