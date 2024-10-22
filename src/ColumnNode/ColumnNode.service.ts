import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ServerConfig } from "Config/ServerConfig";
import { Model } from "mongoose";
import { Coluna } from "Schemas/Coluna";
import { Node } from "Schemas/Node";

@Injectable()
export class ColumnNodeService  
{
    public constructor(
        @InjectModel(Coluna.name, ServerConfig.getMongoDbName())
        private readonly columnRepo : Model<Coluna>
    )
    {}
    /**
     * @summary A funcao vai salvar a coluna no banco de dados mongodb, a ideia eh se caso ela ja nao existir, apenas criar um novo documento
     * @param _id 
     * @param column 
     * @returns 
     */
    async addColumn(_id : string,  column: Coluna): Promise<Node|null> 
    {
        console.log(_id);
        console.log(column);
        return await this.columnRepo.findOneAndUpdate(
            { _id }, 
            { $push : { 'data.colunas' : column}}, 
            { new : true }
        );
    }
    async deleteColumn(_id: string, id_colunacanvas: string): Promise<Node | null> 
    {
        //busca a tabela pelo _id e em seguida deleta a coluna pelo proprio id
        return await this.columnRepo.findOneAndUpdate(
            { _id }, 
            {
                $pull : {
                    'data.colunas' : { _id : id_colunacanvas },
                },
            }, 
            { new : true }
        );
    }
    async updateColumn(_id: string, column: Coluna): Promise<Node | null> {
        return await this.columnRepo.findOneAndUpdate(
            { _id, 'data.colunas._id' : column._id },
            { $set : {
                'data.colunas.$.nm_colunacanvas' : column.nm_colunacanvas,
                'data.colunas.$.tp_colunacanvas' : column.tp_colunacanvas,
                'data.colunas.$.is_autoincrement' : column.is_autoincrement,
                'data.colunas.$.is_UUID' : column.is_UUID,
                'data.colunas.$.is_notnull' : column.is_notnull,
                'data.colunas.$.is_unique' : column.is_unique,
                'data.colunas.$.is_foreignKey' : column.is_foreignkey,
                'data.colunas.$.is_primaryKey' : column.is_primarykey,
                'data.colunas.$.nu_tamanho' : column.nu_tamanho,
                'data.colunas.$.updatedAt': new Date(),
                'data.colunas.$.referencia': column.referencia ??undefined,
            } },
            { new : true }
        );
    }
  
    async getColumnByNameInNode(_id: string, nm_colunacanvas: string): Promise<Coluna | null> 
    {
        return await this.columnRepo.findOne({ _id, 'data.colunas.nm_colunacanvas' : nm_colunacanvas });
    }

}