import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Referencia } from "@Types/Refference";
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
        return await this.moduleDiagramRepo.findOneAndUpdate(
            {_id : modulo._id}, 
            {
                nm_modulodiagrama : modulo.nm_modulodiagrama,
                id_banco : modulo.id_banco
            }
        );    
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
        const nodesInsideTheDeletedDiagram = await this.nodeRepo.find({ 'data.id_modulodiagrama' : _id });
        
        if (nodesInsideTheDeletedDiagram.length> 0) 
        {
            //obtencao do modulo principal (o que é criado automaticamente ao criar um banco de dados novo)
            const mainModule = await this.moduleDiagramRepo.findOne({
                id_banco,
                nm_modulodiagrama : "Principal"
            })
            //verificar se as tabelas no modulo principal possuem referencia no modulo deletado para alterar o availableforedge para true, haja vista que agora elas estao dentro do msm diagrama
           
            await Promise.all(
                nodesInsideTheDeletedDiagram.map(async (table) => {
                    return await this.nodeRepo.findOneAndUpdate(
                        { _id : table._id },
                        { 
                            $set : {
                            'data.id_modulodiagrama' : mainModule._id
                        } }
                    )
                })
            );
            //apos atualizar todas as tabelas para o main module, basta apenas realizar a linkagem
            const nodesInsideMainModule = await this.nodeRepo.find({
                'data.id_modulodiagrama' : mainModule._id,
                'data.id_banco' : id_banco
            });
            console.log(nodesInsideMainModule);
            await Promise.all(
                nodesInsideMainModule.map((node) => {
                    node.data.colunas.forEach(col => {
                        nodesInsideMainModule.forEach(async (lowNode) => {
                            if (
                                node._id != lowNode._id &&
                                col.referencia && 
                                col.referencia.id_node == lowNode._id && 
                                !col.referencia.availableForEdge
                            ) 
                            {
                                await this.nodeRepo.findOneAndUpdate(
                                    { 'data.colunas._id' : col._id },
                                    { $set : { 
                                        'data.colunas.$.referencia' : {
                                            availableForEdge : true,
                                            id_node : col.referencia.id_node,
                                            id_tabelasource : col.referencia.id_tabelasource,
                                            id_tabelatarget : col.referencia.id_tabelatarget
                                        } as Referencia
                                    }}
                                )
                            }
                        })
                    })
                })
            )
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