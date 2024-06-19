import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SubscribeNewsletterDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario que se suscribe al boletín',
    example: 'usuario@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}