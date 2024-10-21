import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator"
export class GetUserProjectsDTO 
{
    @ApiProperty({name : "id_usuario"})
    @IsNotEmpty()
    @IsString()
    id_usuario : string;
}