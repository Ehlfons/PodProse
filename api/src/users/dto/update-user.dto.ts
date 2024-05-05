import { IsString, IsOptional, Validate } from 'class-validator';
import { ValidateDNI } from '../../auth/dto/custom-validators'; 


export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  @Validate(ValidateDNI)
  readonly DNI?: string;

  @IsString()
  @IsOptional()
  readonly companyWorkdayId?: string;
}