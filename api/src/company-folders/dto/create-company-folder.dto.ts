import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyFolderDto {

    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsString()
    companyId: string;
}
