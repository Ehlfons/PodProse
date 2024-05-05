import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CheckinsService } from './checkins.service';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('checkins')
export class CheckinsController {
    constructor(
        private checkinsService: CheckinsService ,
        private prismaService : PrismaService
    ){}

    @Post(':userId/start-workday')
    async startWorkday(@Param('userId') userId: string ){
        try {
            const newCheckin = await this.checkinsService.startWorkday(userId);
            return { message: 'A currar máquina' };
        }catch(error){
            if(error instanceof NotFoundException) {
                return { message: error.message};
            }
            throw error;
        }
    }

    @Post(':userId/end-workday')
    async endWorkday(@Param('userId') userId: string ){
        try {
            const endCheckin = await this.checkinsService.endWorkday(userId);
            return { message: 'A casa máquina' };
        }catch(error){
            if(error instanceof NotFoundException) {
                return { message: error.message};
            }
            throw error;
        }
    }

    @Post(':userId/pause-workday')
    async pauseWorkday(@Param('userId') userId: string ){
        try {
            const pauseCheckin = await this.checkinsService.pauseWorkday(userId);
            return { message: 'Tomando un descanso..' };
        }catch(error){
            if(error instanceof NotFoundException) {
                return { message: error.message};
            }
            throw error;
        }
    }

    @Post(':userId/restart-workday')
    async restartWorkday(@Param('userId') userId: string ){
        try {
            const restartCheckin = await this.checkinsService.restartWorkday(userId);
            return { message: 'De vuelta los mandos de la nave' };
        }catch(error){
            if(error instanceof NotFoundException) {
                return { message: error.message};
            }
            throw error;
        }
    }

    @Get(':userId/recover-checkin')
    async recoverCheckIn(@Param('userId') userId: string ){
        try {
            const checkin = await this.checkinsService.recoverCheckIn(userId);
            return checkin;
        }catch(error){
            if(error instanceof NotFoundException) {
                return { message: error.message};
            }
            throw error;
        }
    }

    @Get('data/:userId/:date')
    async calculateByDate(@Param('userId') userId: string , @Param('date') date: Date ){
        try {
            const dataSummary = await this.checkinsService.calculateByDate(userId,date);
            return dataSummary;
        }catch(error){
            if(error instanceof NotFoundException) {
                return { message: error.message};
            }
            throw error;
        }
    }

    @Get(':userId/delete')
    async delete(@Param('userId') userId: string ){
        try {
            const deleteUser = await this.prismaService.checkIns_Users.deleteMany({
                where : { userId : userId}
            })  ;
            return true;
        }catch(error){
            if(error instanceof NotFoundException) {
                return { message: error.message};
            }
            throw error;
        }
    }
}
