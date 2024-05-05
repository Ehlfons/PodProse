import { IsNotEmpty, IsString, IsUUID, IsOptional, IsDate , IsIn, IsISO8601, Matches } from 'class-validator';

export class CreateWorkersRequestDto {

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  startDate: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  endDate: string;

  @IsNotEmpty()
  @IsIn(["Vacaciones", "Asuntos Propios", "Otros"])
  type: string;

  @IsOptional()
  @IsString()
  description: string;


  @IsNotEmpty()
  @IsUUID()
  userId: string;

}
