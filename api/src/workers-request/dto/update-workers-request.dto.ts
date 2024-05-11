
import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWorkersRequestDto {
  @ApiProperty({ 
    type: String, 
    description: 'Estado de la solicitud', 
    enum: ['Denegado', 'Aprobado'] 
  })
  @IsNotEmpty()
  @IsIn(['Denegado', 'Aprobado'])
  status: string;

  @ApiProperty({ 
    type: String, 
    description: 'Respuesta a la solicitud' 
  })
  @IsNotEmpty()
  @IsString()
  response: string;
}
