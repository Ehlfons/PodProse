import { IsString, IsOptional, Matches, validate, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateWorkdayDto {
  @ApiProperty({ type: String, description: 'ID de la jornada laboral de la empresa' })
  @IsString()
  companyWorkdayId: string;

  @ApiProperty({ type: String, description: 'Descripción de la jornada laboral' })
  @IsString()
  description: string 


  @ApiProperty({ type: String, required: true, description: 'Hora de inicio de la jornada laboral para el lunes en formato XX:XX' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'El formato de hora debe ser XX:XX' })
  monday: string | null;

  @ApiProperty({ type: String, required: true, description: 'Hora de inicio de la jornada laboral para el martes en formato XX:XX' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'El formato de hora debe ser XX:XX' })
  tuesday: string | null;

  @ApiProperty({ type: String, required: true, description: 'Hora de inicio de la jornada laboral para el miercoles en formato XX:XX' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'El formato de hora debe ser XX:XX' })
  wednesday: string | null;

  @ApiProperty({ type: String, required: true, description: 'Hora de inicio de la jornada laboral para el jueves en formato XX:XX' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'El formato de hora debe ser XX:XX' })
  thursday: string | null;

  @ApiProperty({ type: String, required: true, description: 'Hora de inicio de la jornada laboral para el viernes en formato XX:XX' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'El formato de hora debe ser XX:XX' })
  friday: string | null;


  @ApiProperty({ type: String, required: true, description: 'Hora de inicio de la jornada laboral para el sábado en formato XX:XX' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'El formato de hora debe ser XX:XX' })
  saturday: string | null;


  @ApiProperty({ type: String, required: true, description: 'Hora de inicio de la jornada laboral para el domingo en formato XX:XX' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'El formato de hora debe ser XX:XX' })
  sunday: string | null;
  
  @ApiProperty({ type: Number, description: 'Día de inicio de la jornada laboral (entre 0 y 31)' })
  @IsInt()
  @Min(0)
  @Max(31)
  dayStart: number;

  @ApiProperty({ type: Number, description: 'Día de finalización de la jornada laboral (entre 0 y 31)' })
  @IsInt()
  @Min(0)
  @Max(31)
  dayEnd: number;

  @ApiProperty({ type: Number, description: 'Mes de inicio de la jornada laboral (entre 0 y 12)' })
  @IsInt()
  @Min(0)
  @Max(12)
  monthStart: number;

  @ApiProperty({ type: Number, description: 'Mes de finalización de la jornada laboral (entre 0 y 12)' })
  @IsInt()
  @Min(0)
  @Max(12)
  monthEnd: number;


}



