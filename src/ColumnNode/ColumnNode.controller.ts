import { Body, Controller, Delete, HttpCode, Param, Post, Put } from "@nestjs/common";
import { Coluna } from "Schemas/Coluna";
import { ColumnNodeService } from "./ColumnNode.service";

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
    @HttpCode(201)
    async saveColumn(@Body() dtoCols : DtoColumnArgs) 
    {
        const { _id, coluna } = dtoCols;
        if (dtoCols.coluna._id) 
        {
            const response = await this.columnNodeService.updateColumn(_id, coluna)
            return {
                node : response,
                statusCode : 200,
                message : "Coluna atualizada"
            };
        }
        const response = await this.columnNodeService.addColumn(_id, coluna);
        return {
            node : response,
            statusCode : 201,
            message : "Coluna criada"
        };
    }
    @Post("create")
    async addColumn(@Body() dtoCols : DtoColumnArgs) 
    {
        console.log(dtoCols);
        const nodeUpdatedWithNewColumn = await this.columnNodeService.addColumn(dtoCols._id, dtoCols.coluna);
        return {
            message : "Coluna adicionada com sucesso a tabela!",
            node : nodeUpdatedWithNewColumn,
            statusCode : 201
        };
    }
    @Put("update")
    async updateColumn(@Body() dtoCols : DtoColumnArgs) 
    {
        const updatedColumn = await this.columnNodeService.updateColumn(dtoCols._id, dtoCols.coluna);
        return {
            updatedColumn,
            statusCode : 200,
            message : "Updated column"
        };
    }
    /**
     * @summary A funcao recebe como parametros para a atualiazacao do documento o id da tabela e o id da tabela.
     */
    @Delete("delete/:_id/:columnId")
    async deleteColumn(@Param("_id") _id : string, @Param("columnId") columnId : string) 
    {
        console.log(_id, columnId);
        const deletedColumn = await this.columnNodeService.deleteColumn(_id,columnId);
        return {
            deletedColumn,
            statusCode : 200,
            message : "Column has been deleted successfully"
        };
    }

}