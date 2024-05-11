// create-company-file.dto.ts

import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '@prisma/client';

export class CreateCompanyFileDto {
  @IsNotEmpty()
  @IsString()
  folderId: string;

  @IsNotEmpty()
  @IsString()
  description: string;

}
