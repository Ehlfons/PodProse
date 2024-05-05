import { Controller, NotFoundException, Param , Post} from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post(':email')
  async createTokenSendEmail(@Param('email') email : string){
    try {
      const resetPassword = await this.resetPasswordService.addTokenAndSendEmail(email);
      return resetPassword;
      
    } catch (error) {
      if(error instanceof NotFoundException) {
        return { message: error.message};
    }
    throw error;
    }
      
    }

    @Post('/reset/:email/:token/:password')
    async resetPassword(@Param('email') email : string , @Param('token') token : string , @Param('password') password : string   ){
      try {
        const resetPasswordMessage = await this.resetPasswordService.changePassword(email,token,password);
        return resetPasswordMessage;
        
      } catch (error) {
        if(error instanceof NotFoundException) {
          return { message: error.message};
      }
      throw error;
      }
        
      }

}


