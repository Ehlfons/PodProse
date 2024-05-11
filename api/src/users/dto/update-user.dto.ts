import { IsString, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    description: 'Nombre del usuario',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    type: String,
    description: 'Correo electrónico del usuario',
    required: false,
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email?: string;
}
