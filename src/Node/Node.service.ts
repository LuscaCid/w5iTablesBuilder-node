import { ServerConfig } from "Config/ServerConfig";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Node } from "Schemas/Node";
import { Model } from "mongoose";
import { PositionUpdateArgs } from "Schemas/Position";
import { Table } from "Schemas/Table";
@Injectable()
export class NodeService
{
    public constructor (
        @InjectModel(Node.name, ServerConfig.getMongoDbName())
        private readonly nodeRepo : Model<Node>
    )
    {}
    async updateNodePosition(args: PositionUpdateArgs): Promise<Node | null> 
    {
        return await this.nodeRepo.findOneAndUpdate(
            { _id : args.id_node }, 
            {
                position : { 
                    x : args.xPos, 
                    y : args.yPos
                }
            },
        ); 
    }
    async updateNameAndClass (table : Node) 
    {
        return await this.nodeRepo.findOneAndUpdate(
            { _id : table.id }, 
            {
                data : {
                    nm_tabelacanvas : table.data.nm_tabelacanvas,
                    nm_classmodelo : table.data.nm_classmodelo,
                    id_modulodiagrama : table.data.id_modulodiagrama,
                    deletable : false,
                    colunas : table.data.colunas,
                    dt_atualizacao : new Date(),
                    dt_criacao : table.data.dt_atualizacao,
                    id_banco : table.data.id_banco,
                    nm_usuariocriador : table.data.nm_usuariocriador,
                }  as Table
            },
        ) 
    }
    async updateOne(_id: string, node: Node): Promise<Node | null> 
    {
        return await this.nodeRepo.findOneAndUpdate(
            { _id }, 
            node, 
            { new : false,  returnDocument : "after" }
        );
    }
    async addOne (tabela : Node) 
    {
        const snapshot = await this.nodeRepo.create(tabela);
        // await TabelaModel.findByIdAndUpdate(snapshot.id, { id : stringa });
        return snapshot.id as string;
    } 
    async updateTabela (node : Node) 
    {
        await this.nodeRepo.updateOne({_id : node._id}, node);
    }
    async addMany(tabelas : Node[])
    {
       return await this.nodeRepo.insertMany(tabelas);
    }
    async getOne(_id : string): Promise<Node> 
    {
       return await this.nodeRepo.findOne({_id}) as Node;
    }
    async getMany(id_banco : string, id_modulodiagrama : string): Promise<Node[]> 
    {
        if (id_modulodiagrama) 
        {
            const nodes = await this.nodeRepo.find({
                'data.id_banco' : id_banco,
                'data.id_modulodiagrama' : id_modulodiagrama
            });
            return nodes.map((node) => ({...node.toJSON(), id : node.id}));
        }
        const nodes = await this.nodeRepo.find({
            'data.id_banco' : id_banco
        });
        //retorna com base na possivel inexistencia do id do diagrama caso queira que a busca seja de todo o banco de dados
        return nodes.map((node) => ({...node.toJSON(), id : node.id}));
    }
    async deleteOne(_id: string) 
    {
        return await this.nodeRepo.findOneAndDelete({_id});
    }
    async deleteMany(nodes: Node[]) 
    {
        const tablesDeleted = await Promise.all(
                nodes.map(
                    async (node) => {
                        return await this.nodeRepo.findOneAndDelete({id : node._id}) as Node;
                }
            )
        )
        return tablesDeleted;
    }

    async deleteNodesByDatabaseId (id_banco : string) 
    {
        await this.nodeRepo.deleteMany({
            'data.id_banco' : id_banco
        })
    } 

    
}