import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Banco, BancoSchema } from "Schemas/Database";
import { DatabaseController } from "./Database.controller";
import { DatabaseService } from "./Database.service";

/**
 * @summary Este modulo nao eh de configuracao do banco de dados o qual a aplicacao realizara conexao para obtencao ou insercao de informacoes. Se trata dos bancos que serao inseridos na aplicacao dentro dos projetos os quais serao inseridos os sqls para gerenciamento do banco de dados
 * @author Lucas Cid <lucasfelipaaa@gmail.com>
 */
@Module({
    imports : [
        MongooseModule.forFeature([
            { name : Banco.name, schema : BancoSchema }
        ])
    ],
    controllers : [DatabaseController],
    providers : [DatabaseService]
})
export class DatabaseModule 
{}