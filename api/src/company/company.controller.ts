import { Controller, Get, Param, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyService } from './company.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Company')
@Controller('company')
export class CompanyController {

    constructor(
        private readonly prisma : PrismaService ,
        private readonly empresaService : CompanyService,
    ){}

    @Get(':companyId/users')
    async getUsers(@Param('companyId') companyId:String){
        const users = await this.empresaService.getUsers(String(companyId));
        return users;
    }


}
