import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServerConfig } from "Config/ServerConfig";
import { Projeto, ProjetoSchema } from "Schemas/Project";
import { ProjetoController } from "./Project.controller";
import { ProjetoService } from "./Project.service";
import { DatabaseService } from "src/Database/Database.service";
import { Banco, BancoSchema } from "Schemas/Database";
import { UsuarioProjeto, UsuarioProjetoSchema } from "Schemas/UserProject";
import { Notification, NotificationSchema } from "Schemas/Notification";

@Module({
    imports : [
        MongooseModule.forFeature([
        { name : Projeto.name, schema : ProjetoSchema },
        { name : Banco.name, schema : BancoSchema },
        { name : UsuarioProjeto.name, schema : UsuarioProjetoSchema },
        { name : Notification.name, schema : NotificationSchema },
        ], ServerConfig.getEnv("CONNECTION_NAME"))
    ],
    controllers : [ ProjetoController ],
    providers : [ ProjetoService, DatabaseService ] ,
})
export class ProjectModule 
{}