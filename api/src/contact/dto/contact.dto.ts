import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ContactDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario que contacta',
    example: 'usuario@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'Asunto del mensaje',
    example: 'Consulta sobre el servicio',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    description: 'Mensaje del usuario',
    example: 'Me gustaría saber más sobre sus servicios.',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario (opcional)',
    example: '+34 123 456 789',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;
}