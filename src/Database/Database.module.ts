import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Banco, BancoSchema } from "Schemas/Database";
import { DatabaseController } from "./Database.controller";
import { DatabaseService } from "./Database.service";
import { ServerConfig } from "Config/ServerConfig";
import { ProjetoService } from "src/Projects/Project.service";
import { ModuloDiagramaService } from "src/ModuloDiagrama/moduloDiagrama.service";
import { Projeto, ProjetoSchema } from "Schemas/Project";
import { ModuloDiagrama, ModuloDiagramaSchema } from "Schemas/ModuloDiagrama";
import { UsuarioProjeto, UsuarioProjetoSchema } from "Schemas/UserProject";
import { Notification, NotificationSchema } from "Schemas/Notification";

/**
 * @summary Este modulo nao eh de configuracao do banco de dados o qual a aplicacao realizara conexao para obtencao ou insercao de informacoes. Se trata dos bancos que serao inseridos na aplicacao dentro dos projetos os quais serao inseridos os sqls para gerenciamento do banco de dados
 * @author Lucas Cid <lucasfelipaaa@gmail.com>
 */
@Module({
    imports : [
        
        MongooseModule.forFeature([
            { name : Banco.name, schema : BancoSchema },
            { name : Projeto.name, schema : ProjetoSchema },
            { name : ModuloDiagrama.name, schema : ModuloDiagramaSchema },
            { name : UsuarioProjeto.name, schema : UsuarioProjetoSchema },
            { name : Notification.name, schema : NotificationSchema },
        ], ServerConfig.getEnv("CONNECTION_NAME")) 
    ],
    controllers : [DatabaseController],
    providers : [
        DatabaseService, 
        ProjetoService,
        ModuloDiagramaService
    ]
})
export class DatabaseModule 
{}