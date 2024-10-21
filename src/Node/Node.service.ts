import { ServerConfig } from "Config/ServerConfig";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Node } from "Schemas/Node";
import { Model } from "mongoose";
import { PositionUpdateArgs } from "Schemas/Position";
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
            table,
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
        await this.nodeRepo.updateOne({_id : node.id}, node);
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
                        return await this.nodeRepo.findOneAndDelete({id : node.id}) as Node;
                }
            )
        )
        return tablesDeleted;
    }

    
}