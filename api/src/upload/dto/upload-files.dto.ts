import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadFilesDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  files: any;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  categoryId: string;
}