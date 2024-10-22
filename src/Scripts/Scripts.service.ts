import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ServerConfig } from "Config/ServerConfig";
import { Model } from "mongoose";
import { Coluna } from "Schemas/Coluna";
import { Banco } from "Schemas/Database";
import { ModuloDiagrama } from "Schemas/ModuloDiagrama";
import { Node } from "Schemas/Node";
import { DatabaseConnection } from "src/Database/DatabaseConnection.service";
import { TablesColumnsQuery } from "src/utils/Constants";
import { ColumnWithHisTables, SqlTypes, typesDictionary } from "./Interface/scripts";

@Injectable()
export class ScriptService
{
    public constructor (
        // private reaonly script
        @InjectModel(Banco.name, ServerConfig.getMongoDbName())
        private readonly bancoRepo : Model<Banco>,
        @InjectModel(ModuloDiagrama.name, ServerConfig.getMongoDbName())
        private readonly moduleRepo : Model<ModuloDiagrama>
    )
    {}
    /**
     * @summary a partir das colunas retornadas, pode-se construir a estrutura das tabelas 
     * @returns 
     */
    async getDatabaseCols (database : Banco) 
    {
        //abrindo conexao com as informacoes resgatadas anteriormente do banco de dados 
        const conn = DatabaseConnection.openConnection(database);
        const response = await conn.query(TablesColumnsQuery);
        return response.rows;
    }
    async UnifyTablesWithYourColumns(id_banco : string, columns : ColumnWithHisTables[]) 
    {
        const nodesFormatted : Node[] = [];
        const databaseSettings = await this.bancoRepo.findById(id_banco);
        if (!databaseSettings) 
        {
            throw new NotFoundException("Não foi possivel conectaarse ao banco de dados, id nao encontrado.");
        }
        //resgatar a informacao do modulo_diagrama principal do banco de dados
        const moduloDiagramaPrincipal = await this.moduleRepo.findOne({ id_banco : databaseSettings.id });
        if (!moduloDiagramaPrincipal) 
        {
            throw new NotFoundException("Ocorreu um problema. Modulo diagrama principal nao cadastrado no banco!");
        }
        columns.forEach((col) => {
            if(!this.ensureTableInTablesArr(nodesFormatted, col))
            {
                /// inicialmente os documentos serao inseridos sem a coluna foreingn key para obterem a propriedade id e posteriormente, com base ainda na consulta feita a qual obteve a informacao necessaria para criacao da relacao, entao, serao feitas
                nodesFormatted.push({
                    data : {
                        dt_atualizacao : new Date(),
                        dt_criacao : new Date(),
                        nm_usuariocriador : databaseSettings.nm_usuariocriador,
                        id_banco : databaseSettings.id,
                        id_modulodiagrama : moduloDiagramaPrincipal!.id,
                        nm_tabelacanvas : col.nm_tabelacanvas,
                        nm_classmodelo : col.nm_tabelacanvas,
                        deletable : false,
                        
                        colunas : [
                            ...columns
                            .map((coluna) => {
                                //remocao das propriedades que nao quero no meu objeto
                                let { referenced_column ,referenced_table, ...column } = coluna;
                                // if (column.is_foreignkey) 
                                // {
                                //     column = {
                                //         ...column, 
                                //         referencia : { 
                                //             id_node : referenced_table!
                                //         }
                                //     }
                                // };
                                column.tp_colunacanvas = typesDictionary[coluna.tp_colunacanvas as SqlTypes];
                                return column as Coluna; 
                            })
                            .filter((coluna) =>  coluna.nm_tabelacanvas === col.nm_tabelacanvas),
                        ],
                    },
                    position : {
                        x : Math.round(Math.random() * 1200),
                        y : Math.round(Math.random() * 1200),
                    },
              
                    type : "table",
                } as Node);
            };
        });
        return nodesFormatted;
    }
    ensureTableInTablesArr(nodesArray : Omit<Node, "_id">[], col : ColumnWithHisTables) 
    {
        return nodesArray.find((node) => node.data.nm_tabelacanvas === col.nm_tabelacanvas);
    }
    /**
     * @summary funcao que é executada no frontend, nela vai acontecer toda a a logica de comparacao de tabelas do banco e as que estao no fronetnend
     * @author Lucas Cid <lucasfelipaaa@gmail.com>
     * @created 12/08/2024
     * @param sql : string
     */
    async runSqlScript (sql : string, databaseSettings : Banco) 
    {
        const pool = DatabaseConnection.openConnection(databaseSettings);
        const tablesFromSqlToCompare = sql.split("--")
        try {
            const responses = await Promise.all(
                tablesFromSqlToCompare.map( async (table) => {
                    //buscando a tabela pelo seu nome no atual banco de dados conectado
                    const tableFromDatabase = await pool.query(table);

                    //apos isto eh nessario realizar as comparacoes entre as colunas presentes no sql enviado como parametro e o objeto coluna retornado do banco
                    return tableFromDatabase;
                })
            )

            return responses;
        } catch (err : unknown) 
        {
            Logger.error(err);
            throw new InternalServerErrorException(err)
        }
    }
}