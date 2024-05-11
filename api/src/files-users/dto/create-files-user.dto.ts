
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFilesUsersDto {
  @IsNotEmpty()
  @IsString()
  fileId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
