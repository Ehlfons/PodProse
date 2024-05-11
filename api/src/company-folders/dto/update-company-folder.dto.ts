import { PartialType } from '@nestjs/swagger';
import { CreateCompanyFolderDto } from './create-company-folder.dto';
import { IsNotEmpty, IsString } from 'class-validator';


export class UpdateCompanyFolderDto extends PartialType(CreateCompanyFolderDto) {
    @IsString()
    description: string;
  
}
