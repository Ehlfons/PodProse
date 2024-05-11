import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe , UseGuards } from '@nestjs/common';
import { WorkersRequestService } from './workers-request.service';
import { CreateWorkersRequestDto } from './dto/create-workers-request.dto';
import { UpdateWorkersRequestDto } from './dto/update-workers-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthAdminGuard } from 'src/auth/guard/authAdmin.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';


@ApiTags('Solicitudes')
@Controller('workers-request')
export class WorkersRequestController {
  constructor(private readonly workersRequestService: WorkersRequestService) {}

  @Post()
  @UseGuards(AuthAdminGuard)
  create(@Body(ValidationPipe) createWorkersRequestDto: CreateWorkersRequestDto) {
    return this.workersRequestService.create(createWorkersRequestDto);
  }

  @Get(':companyId')
  @UseGuards(AuthAdminGuard)
  async getRequestByCompany(@Param('companyId') companyId: string) {
    return this.workersRequestService.getWorkersRequests(companyId);
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard)
  async getRequestByUser(@Param('userId') userId: string) {
    return this.workersRequestService.getUserRequests(userId);
  }



  @Patch(':id')
  @UseGuards(AuthAdminGuard)
  update(@Param('id') id: string, @Body(ValidationPipe) updateWorkersRequestDto: UpdateWorkersRequestDto) {
    return this.workersRequestService.update(id, updateWorkersRequestDto);
  }

}
