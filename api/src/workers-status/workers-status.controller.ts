import { Controller, Get, Param , UseGuards} from '@nestjs/common';
import { WorkersStatusService } from './workers-status.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthAdminGuard } from 'src/auth/guard/authAdmin.guard';


@ApiTags('Estado Trabajadores')
@Controller('workers-status')
export class WorkersStatusController {
  constructor(private readonly workersStatusService: WorkersStatusService) {}

  @Get('users/:companyId')
  @UseGuards(AuthAdminGuard)
  async getUserStatus(@Param('companyId') companyId : string){
    return await this.workersStatusService.knowStatusByCompanyId(companyId);
  }

}
