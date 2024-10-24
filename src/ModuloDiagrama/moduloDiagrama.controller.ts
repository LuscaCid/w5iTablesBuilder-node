import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ModuloDiagramaService } from "./moduloDiagrama.service";
import { ModuloDiagrama } from "Schemas/ModuloDiagrama";

@Controller("modulo_diagrama")
export class ModuloDiagramaController 
{
    public constructor(
        private readonly moduloDiagramService: ModuloDiagramaService
    )
    {}
    @Post("addOne")
    async addModuloDiagrama(@Body() modulo : ModuloDiagrama) 
    {   
        const moduloDiagrama = await this.moduloDiagramService.addOne(modulo);
        return {
            moduloDiagrama,
            status : 201
        }
    }
    @Patch("updateOne")
    async updateModuloDiagrama(@Body() newModulo : ModuloDiagrama )
    {
        const updated = await this.moduloDiagramService.updateOne(newModulo);
        return {
            moduloDiagrama : updated,
            statusCode : 200
        }
    }
    @Get("get-modules-database/:id_banco")
    async getModulosDiagramaBanco (@Param("id_banco")  id_banco : string) 
    {
        const modulosDiagrama = await this.moduloDiagramService.getMany(id_banco);
        return {
            modules : modulosDiagrama,
            status : 200,
        };
    }
    @Delete("deleteOne/:_id/:id_banco") 
    async deleteModulodiagrama(@Param("_id") _id : string, @Param("id_banco") id_banco : string) 
    {
        const moduleDeleted = await this.moduloDiagramService.deleteOne(_id, id_banco);
        return {
            deletedModule : moduleDeleted, 
            status : 200
        };
    }
}