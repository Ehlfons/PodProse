import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ type: String, description: 'Nombre del usuario', minLength: 3 })
  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 carácteres' })
  name: string;

  @ApiProperty({ type: String, description: 'Nickname del usuario', minLength: 3, maxLength: 16})
  @IsString({ message: 'El nombre de usuario debe ser una cadena de caracteres' })
  @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 carácteres' })
  @MaxLength(16, { message: 'El nombre de usuario no puede tener más de 16 caracteres' })
  username: string;

  @ApiProperty({ type: String, description: 'Correo electrónico del usuario' })
  @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
  email: string;

  @ApiProperty({ type: String, description: 'Contraseña del usuario', minLength: 4 })
  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  @MinLength(4, { message: 'La contraseña debe tener al menos 4 carácteres' })
  password: string;
}
