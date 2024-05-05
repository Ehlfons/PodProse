import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { WorkersRequestService } from './workers-request.service';
import { CreateWorkersRequestDto } from './dto/create-workers-request.dto';
import { UpdateWorkersRequestDto } from './dto/update-workers-request.dto';

@Controller('workers-request')
export class WorkersRequestController {
  constructor(private readonly workersRequestService: WorkersRequestService) {}

  @Post()
  create(@Body(ValidationPipe) createWorkersRequestDto: CreateWorkersRequestDto) {
    return this.workersRequestService.create(createWorkersRequestDto);
  }

  @Get(':companyId')
  async getRequestByCompany(@Param('companyId') companyId: string) {
    return this.workersRequestService.getWorkersRequests(companyId);
  }

  @Get('user/:userId')
  async getRequestByUser(@Param('userId') userId: string) {
    return this.workersRequestService.getUserRequests(userId);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateWorkersRequestDto: UpdateWorkersRequestDto) {
    return this.workersRequestService.update(id, updateWorkersRequestDto);
  }

}
