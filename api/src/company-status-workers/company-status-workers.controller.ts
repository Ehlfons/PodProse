import { Controller, Get, Param , UseGuards} from '@nestjs/common';
import { CompanyStatusWorkersService } from './company-status-workers.service';
import { AuthAdminGuard } from 'src/auth/guard/authAdmin.guard';

@Controller('company-status-workers')
export class CompanyStatusWorkersController {
  constructor(private readonly companyStatusWorkersService: CompanyStatusWorkersService) {}

  @Get(':companyId/:date')
  @UseGuards(AuthAdminGuard)
  async getStatusWorkers(@Param('companyId') companyId : string , @Param('date') date : Date  ){
    return await this.companyStatusWorkersService.getStatusByCompanyIdAndDate(companyId,date);
  }

}
