import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePodcastDto {
  @ApiProperty({
    description: 'Título del podcast',
    example: 'Nuevo título del podcast',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Descripción del podcast',
    example: 'Nueva descripción del podcast',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}