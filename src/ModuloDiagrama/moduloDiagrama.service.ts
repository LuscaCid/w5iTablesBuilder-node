import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ServerConfig } from "Config/ServerConfig";
import { Model } from "mongoose";
import { ModuloDiagrama } from "Schemas/ModuloDiagrama";
import { Node } from "Schemas/Node";

@Injectable()
export class ModuloDiagramaService 
{
    public constructor (
        @InjectModel(ModuloDiagrama.name, ServerConfig.getMongoDbName())
        private readonly moduleDiagramRepo : Model<ModuloDiagrama>,

        @InjectModel(Node.name, ServerConfig.getMongoDbName())
        private readonly nodeRepo : Model<Node>
    ) 
    {} 
    async updateOne(modulo: ModuloDiagrama): Promise<ModuloDiagrama|null> 
    {
        this.validateName(modulo.nm_modulodiagrama, modulo.id_banco);
        return await this.moduleDiagramRepo.findOneAndReplace({_id : modulo._id}, modulo);    
    }
    async addMany(modulos: ModuloDiagrama[]): Promise<void> 
    {
        await this.moduleDiagramRepo.insertMany(modulos);
    }
    async addOne(modulo: ModuloDiagrama) : Promise<ModuloDiagrama> 
    {
        this.validateName(modulo.nm_modulodiagrama, modulo.id_banco);
        return await this.moduleDiagramRepo.create(modulo);
    }
    async deleteOne(_id: string, id_banco : string): Promise<void> 
    {
        //apos deletar o modulo diagrma, vai ser necessario buscar o principal do banco de dados, buscar as tabelas com o id do modulo apagado e alterar para o modulo cujo nome é principal e obter o id dele e alterar em cada documento
        const tablesInsideThisDiagram = await this.nodeRepo.find({
            'data.id_modulodiagrama' : _id
        });
        if (tablesInsideThisDiagram.length> 0) 
        {
            const mainModule = await this.moduleDiagramRepo.findOne({
                id_banco,
                nm_modulodiagrama : "Principal"
            })
            await Promise.all(
                tablesInsideThisDiagram.map(async (table) => {
                    return await this.nodeRepo.findOneAndUpdate(
                        { _id : table._id },
                        { $set : {
                            'data.id_modulodiagrama' : mainModule._id
                        } }
                    )
                })
            );
        }
         await this.moduleDiagramRepo.findByIdAndDelete({_id});
        
    }
    async getMany(id_banco: string): Promise<ModuloDiagrama[]> 
    {
        return await this.moduleDiagramRepo.find({id_banco}); 
    }   

    async validateName (moduleName : string, id_banco : string) 
    {
        const alreadyCreated = await this.moduleDiagramRepo.findOne({
            nm_modulodiagrama : moduleName,
            id_banco 
        });
        if (alreadyCreated) 
        {
            throw new UnauthorizedException("Modulo já presente no banco.");
        }
    }
}