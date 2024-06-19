import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario que ha olvidado la contraseña',
    example: 'usuario@example.com',
  })
  @IsEmail()
  email: string;
}