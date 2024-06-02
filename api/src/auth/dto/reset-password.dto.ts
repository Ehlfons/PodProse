import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    type: String,
    description: 'Token de restablecimiento de contraseña',
  })
  @IsString()
  token: string;

  @ApiProperty({ type: String, description: 'Nueva contraseña', minLength: 4 })
  @IsString()
  @MinLength(4, { message: 'La contraseña debe tener al menos 4 caracteres' })
  newPassword: string;
}
