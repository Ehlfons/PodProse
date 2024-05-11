import { Controller, Get, Param } from '@nestjs/common';
import { WorkersProfileService } from './workers-profile.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Perfil Users')
@Controller('workers-profile')
export class WorkersProfileController {
  constructor(private readonly workersProfileService: WorkersProfileService) {}

  @Get(':userId')
  async getProfile(@Param('userId') userId : string ){
    return await this.workersProfileService.getProfileByUserId(userId);
  }

}
