
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFilesUsersDto } from './dto/create-files-user.dto';
import { CreateFilesArrayUsersDto } from './dto/create-files-array-users.dto';

@Injectable()
export class FilesUsersService {
  constructor(private prisma: PrismaService) {}

  async createFileUser(filesUsersData: CreateFilesUsersDto ) {
    return this.prisma.filesUsers.create({
      data: 
      filesUsersData,
    });
  }

  async deleteFilesUsers(id: string) {
    return this.prisma.filesUsers.delete({
      where: { id },
    });
  }

  async createFilesArrayUsers(createFilesArrayUsersDto: CreateFilesArrayUsersDto ) {
    const fileId = createFilesArrayUsersDto.fileId;
    const usersIdArray = createFilesArrayUsersDto.usersId;

    usersIdArray.map( async (userId) => {
      const filesUsersData = {
        fileId:fileId,
        userId:userId
      }
      
      await this.createFileUser(filesUsersData);

    });

  }

  async getUsersByFileId(fileId: string) {
    const usersId = await this.prisma.filesUsers.findMany({ where: { fileId: fileId } });

    const usersArray = await Promise.all(usersId.map(async (user) => {
        const userData = await this.prisma.user.findFirstOrThrow({
            where: { id: user.userId },
            select: {
                id: true,
                name: true,
            }
        });
        return userData;
    }));

    const data2send = {
        counterUsers: usersId.length,
        users: usersArray
    };

    return data2send;
}


}
