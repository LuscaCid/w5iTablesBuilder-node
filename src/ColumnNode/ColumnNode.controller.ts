import { Controller, Post } from "@nestjs/common";
import { Body(), Controller, Post, Put } from "@nestjs/common";
import { Response } from "express";
import { Coluna } from "Schemas/Coluna";

interface DtoColumnArgs {
    _id : string; //id do node para o qual a coluna sera direcionada
    coluna : Coluna; // informacoes relativas à tipagem da coluna
}
@Controller('column')
export class ColumnNodeController 
{
    constructor (
        private readonly columnNodeService : ColumnNodeService
    ){}
    /**
     * @Summary Funcao que eh chamada em momento de edicao ou de criacao de coluna atraves do formulário.
     * @param dtoCols 
     * @param res 
     */
    @Post("save")
    async saveColumn(@Body() dtoCols : DtoColumnArgs, res : Response) 
    {
        const response = await this.columnNodeService.saveColumn(dtoCols._id, dtoCols.coluna);
        return res.json({
            node : response,
            statusCode : 200,
            message : "Coluna atualizada/criada"
        }).status(200);
    }
    @Post("create")
    async addColumn(@Body() dtoCols : DtoColumnArgs, res : Response) 
    {
        const nodeUpdatedWithNewColumn = await this.columnNodeService.addColumn(dtoCols._id, dtoCols.coluna);
        return res.json({
            message : "Coluna adicionada com sucesso a tabela!",
            node : nodeUpdatedWithNewColumn,
            statusCode : 201
        }).status(201);
    }
    @Put("update")
    async updateColumn(@Body() dtoCols : DtoColumnArgs, res : Response) 
    {
        const updatedColumn = await this.columnNodeService.updateColumn(dtoCols._id, dtoCols.coluna);
        return res.json({
            updatedColumn,
            statusCode : 200,
            message : "Updated column"
        }).status(200);
    }
    /**
     * @summary A funcao recebe como parametros para a atualiazacao do documento o id da tabela e o id da tabela.
     * @param param0 
     * @param res 
     * @returns 
     */
    @Delete("delete/:_id/:columnId")
    async deleteColumn(@Params {_id, columnId} : {_id : string; columnId : string}, res : Response) 
    {
        const deletedColumn = await this.columnNodeService.deleteColumn(_id,columnId);
        return res.json({
            deletedColumn,
            statusCode : 200,
            message : "Column has been deleted successfully"
        }).status(200);
    }

 

}