// create-dias-festivos-empresa.dto.ts
import { IsArray, ArrayMinSize, ArrayMaxSize, IsNotEmpty, IsDateString, IsString } from 'class-validator';

export class CreateHolidaysCompanyDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  days: HolidayDto[];
}

export class HolidayDto {
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
