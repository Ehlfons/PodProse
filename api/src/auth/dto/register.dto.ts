import { IsEmail, IsString, MinLength, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateDNI } from '../../auth/dto/custom-validators';

export class RegisterDto {
  @ApiProperty({ type: String, description: 'Nombre del usuario', minLength: 1 })
  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  @MinLength(1, { message: 'El nombre debe tener al menos 1 carácter' })
  name: string;

  @ApiProperty({ type: String, description: 'Correo electrónico del usuario' })
  @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
  email: string;

  @ApiProperty({ type: String, description: 'Contraseña del usuario', minLength: 1 })
  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  @MinLength(1, { message: 'La contraseña debe tener al menos 1 carácter' })
  password: string;

  @ApiProperty({ type: String, description: 'Documento nacional de identidad del usuario' })
  @IsString({ message: 'El DNI debe ser una cadena de caracteres' })
  //@ValidateDNI({ message: 'El DNI debe tener 8 números seguidos de una letra' })
  DNI: string;

  @ApiProperty({ type: String, description: 'ID de la empresa a la que pertenece el usuario' })
  @IsString({ message: 'El companyId debe ser una cadena de caracteres' })
  companyId: string;

  @ApiProperty({ type: String, description: 'ID de la jornada laboral de la empresa para el usuario' })
  @IsString({ message: 'El companyWorkdayId debe ser una cadena de caracteres' })
  companyWorkdayId: string;
}
