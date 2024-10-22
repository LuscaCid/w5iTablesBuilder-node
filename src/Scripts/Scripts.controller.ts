import { Body, Controller, Logger, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { DatabaseService } from "src/Database/Database.service";
import { ScriptService } from "./Scripts.service";
import { ApiBody } from "@nestjs/swagger";
import { Node } from "Schemas/Node";

@Controller("script")
export class ScriptController 
{
    public constructor(
        private readonly scriptService : ScriptService,
        private readonly dbService : DatabaseService
    )
    {}
    
    // @Post("run")
    // async runScript(@Body { query } : {query : string}, res : Response)
    // {
    //     const response = await this.scriptService.executeSqlScript(query);
    //     Logger.info("Script sql executado!");
    //     return res.status(200).json({
    //         countRows : response.rowCount,
    //         command   : response.command,
    //         message   : "Script sql executado!",
    //     });
    // }; 
    /**
     * @summary Esta funcao sera executada no momento em que o banco for criado no front, para que se caso houver alguma tabela dentro do banco, ele retorne
     * @author Lucas Cid <lucasfelipaaa@gmail.com>
     * @created 29/08/2024
     */
    @Post("injectInMongoFromDatabase/:id_banco")
    async injectInMongoDatabaseCurrentTables(@Param() id_banco :  string)
    {
        //resgatando as informacoes referentes ao id do banco de dados passado para criacao das tabelas dentro do banco respectivo ao informado
        const databaseRequested = await this.dbService.getBankById(id_banco);
        const columns = await this.scriptService.getDatabaseCols(databaseRequested);
        //criando um array de objetos referentes ao formato de TableNode[] para inseri posteriormente no mongo db e recriar no frontend com base na virtualizacao feita
        // const tabelas = await this.scriptService.UnifyTablesWithYourColumns({
        //     columns, 
        //     id_banco
        // });
        // await this.tabelaService.addTableNodes(tabelas as TableNode[]);

        Logger.debug("Tabelas criadas no mongoDb!");
        return {
            message : "Script sql executado!"
        };
    };

    @Post("injectSqlInDatabase/:id_banco")
    async injectSqlInDatabase(@Body() sql : string, @Param() id_banco : string) 
    {
        const databaseRequested = await this.dbService.getBankById(id_banco);
        if (!databaseRequested) 
        {
            throw new NotFoundException("Banco não encontrado.");
        }
        const response = await this.scriptService.runSqlScript(sql, databaseRequested);
        return response;
    }
    /**
     * @Summary Atualizacao de uma caracteristica da tabela como uma coluna alterada. 
     * @examples Colunas que têm coluna removida, adicionada mesmo apos a adicao no banco. mapeando as constraints para espelhar as alteracoes.
     */
    // @Put("atualizarTabela")
    // @ApiBody({schema : new Node()})
    // async updateTableNode(@Body() node : Node, res : Response)
    // {
    //     //atualiza a tabela virtualizada
    //     const tableNodeUpdated = await this.scriptService.updateNode(node);
    //     if (!tableNodeUpdated)
    //     {
    //         throw new NotFoundException("Id de Node invalido, documento nao encontrado.");
    //     }
    //     //documento atualizado, entao apenas mapaear as alteracoes de colunas referentes ao banco de dados.
    //     return {
    //         message : "Tabelas atualizadas com sucesso",
    //     };
    // }
}

//montagem das rotas relacionadas a rodar o sql, mapear alteracoes e trabalhar com base nisto