import { IsString, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Validate } from 'class-validator';
import { ValidateDNI } from '../../auth/dto/custom-validators';

export class UpdateUserDto {
  @ApiProperty({ type: String, description: 'Nombre del usuario', required: false })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ type: String, description: 'Correo electrónico del usuario', required: false })
  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({ type: String, description: 'Documento nacional de identidad del usuario', required: false })
  @IsString()
  @IsOptional()
  //@Validate(ValidateDNI)
  readonly DNI?: string;

  @ApiProperty({ type: String, description: 'ID de la jornada laboral de la empresa para el usuario', required: false })
  @IsString()
  @IsOptional()
  readonly companyWorkdayId?: string;
}
