import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class CompanyService {

    constructor(
        private readonly prisma: PrismaService
    ){}

    async getUsers(companyId: string) : Promise<User[]> {
        const users = await this.prisma.user.findMany({
            where: {
                companyId: companyId
            }
        });   
        return users;
    }
}
