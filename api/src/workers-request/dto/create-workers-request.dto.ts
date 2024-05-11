import { IsNotEmpty, IsString, IsUUID, IsOptional, Matches, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkersRequestDto {

  @ApiProperty({ 
    type: String, 
    description: 'Fecha de inicio de la solicitud (formato YYYY-MM-DD)', 
    required: false, 
    example: '2024-05-10' 
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'El formato de fecha debe ser YYYY-MM-DD' })
  startDate: string;

  @ApiProperty({ 
    type: String, 
    description: 'Fecha de finalización de la solicitud (formato YYYY-MM-DD)', 
    required: false, 
    example: '2024-05-15' 
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'El formato de fecha debe ser YYYY-MM-DD' })
  endDate: string;

  @ApiProperty({ 
    type: String, 
    description: 'Tipo de solicitud', 
    enum: ['Vacaciones', 'Asuntos Propios', 'Otros'] 
  })
  @IsNotEmpty()
  @IsIn(['Vacaciones', 'Asuntos Propios', 'Otros'])
  type: string;

  @ApiProperty({ 
    type: String, 
    description: 'Descripción de la solicitud', 
    required: false 
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ 
    type: String, 
    description: 'ID del usuario asociado a la solicitud' 
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
