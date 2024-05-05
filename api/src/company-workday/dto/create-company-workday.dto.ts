import { IsString, IsOptional, Matches, validate } from 'class-validator';


export class CreateCompanyWorkdayDto {
  @IsString()
  companyId: string;

  @IsString()
  description: string;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'El formato de hora debe ser XX:XX' })
  monday: string | null;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'El formato de hora debe ser XX:XX' })
  tuesday: string | null;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'El formato de hora debe ser XX:XX' })
  wednesday: string | null;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'El formato de hora debe ser XX:XX' })
  thursday: string | null;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'El formato de hora debe ser XX:XX' })
  friday: string | null;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'El formato de hora debe ser XX:XX' })
  saturday: string | null;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'El formato de hora debe ser XX:XX' })
  sunday: string | null;
}



