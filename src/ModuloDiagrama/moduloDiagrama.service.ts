import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ServerConfig } from "Config/ServerConfig";
import { Model } from "mongoose";
import { ModuloDiagrama } from "Schemas/ModuloDiagrama";

@Injectable()
export class ModuloDiagramaService 
{
    public constructor (
        @InjectModel(ModuloDiagrama.name, ServerConfig.getMongoDbName())
        private readonly moduleDiagramRepo : Model<ModuloDiagrama>
    ) 
    {} 
    async updateOne(modulo: ModuloDiagrama): Promise<ModuloDiagrama|null> 
    {
        return await this.moduleDiagramRepo.findOneAndReplace({_id : modulo._id}, modulo);    
    }
    async addMany(modulos: ModuloDiagrama[]): Promise<void> 
    {
        await this.moduleDiagramRepo.insertMany(modulos);
    }
    async addOne(modulo: ModuloDiagrama) : Promise<ModuloDiagrama> 
    {
        return await this.moduleDiagramRepo.create(modulo);
    }
    async deleteOne(_id: string): Promise<void> 
    {
        await this.moduleDiagramRepo.findByIdAndDelete({_id});
    }
    async getMany(id_banco: string): Promise<ModuloDiagrama[]> 
    {
        return await this.moduleDiagramRepo.find({id_banco}); 
    }   
    async getByName(nm_modulodiagrama: string, id_banco : string): Promise<ModuloDiagrama | null> 
    {
        return await this.moduleDiagramRepo.findOne({nm_modulodiagrama,id_banco});
    }
}