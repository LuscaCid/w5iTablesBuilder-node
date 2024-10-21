import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetNodesDTO 
{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({name : "id_banco"})
    id_banco : string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({name : "id_modulodiagrama"})
    id_modulodiagrama? : string;
}
