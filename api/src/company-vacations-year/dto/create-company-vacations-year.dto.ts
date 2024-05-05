import { IsString, IsInt, MinLength, MaxLength, IsIn, Matches } from 'class-validator';

export class CreateCompanyVacationsYearDto {
  @IsString()
  readonly companyId: string;

  @IsInt()
  readonly numberDays: number;

  @IsString()
  @MinLength(4)
  @MaxLength(4)
  readonly year: string;
}
