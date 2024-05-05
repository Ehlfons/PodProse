import { PartialType } from '@nestjs/swagger';
import { CreateCompanyWorkdayDto } from './create-company-workday.dto';

export class UpdateCompanyWorkdayDto extends PartialType(CreateCompanyWorkdayDto) {
    description?: string;
    monday?: string | null;
    tuesday?: string | null;
    wednesday?: string | null;
    thursday?: string | null;
    friday?: string | null;
    saturday?: string | null;
    sunday?: string | null;
}
