import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFilesArrayUsersDto {
  @ApiProperty({ description: 'Unique identifier for the file.', example: 'uuid' })
  @IsNotEmpty()
  @IsString()
  fileId: string;

  @ApiProperty({ 
    description: 'Array of unique identifiers for the users.', 
    example: ['userId2', 'userId2'] 
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true }) 
  usersId: string[];
}
