import { IsString, IsEmail, MinLength, MaxLength, Validate, IsUUID } from 'class-validator';
import { ValidateDNI } from '../../auth/dto/custom-validators'; 
export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly password: string;

  @IsString()
  @Validate(ValidateDNI) 
  readonly DNI: string;

  @IsString()
  readonly companyWorkdayId: string;
}