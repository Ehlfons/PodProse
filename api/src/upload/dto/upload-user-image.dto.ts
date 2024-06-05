import { ApiProperty } from '@nestjs/swagger';

export class UploadUserImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}