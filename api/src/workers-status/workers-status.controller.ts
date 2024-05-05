import { Controller, Get, Param } from '@nestjs/common';
import { WorkersStatusService } from './workers-status.service';

@Controller('workers-status')
export class WorkersStatusController {
  constructor(private readonly workersStatusService: WorkersStatusService) {}

  @Get('users/:companyId')
  async getUserStatus(@Param('companyId') companyId : string){
    return await this.workersStatusService.knowStatusByCompanyId(companyId);
  }
}
