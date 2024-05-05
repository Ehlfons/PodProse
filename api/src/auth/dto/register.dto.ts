import { IsEmail, IsString, MinLength, Matches, IsIn, Validate } from 'class-validator';
import { ValidateDNI } from '../../auth/dto/custom-validators'; 

export class RegisterDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;

  @Matches(/^\d{8}[a-zA-Z]$/, {
    message: 'El DNI debe tener 8 números seguidos de una letra'
  })
  @Validate(ValidateDNI) 
  DNI: string;

  @IsString()
  companyId: string;

  @IsString()
  readonly companyWorkdayId: string;
}
