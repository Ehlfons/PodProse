
import { IsNotEmpty, IsString, IsUUID, IsOptional, IsDate , IsIn, IsISO8601, Matches } from 'class-validator';


export class UpdateWorkersRequestDto{
    @IsNotEmpty()
    @IsIn(["Denegado", "Aprobado"])
    status: string;

    @IsNotEmpty()
    @IsString()
    response: string;
    
}
