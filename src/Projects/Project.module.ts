import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServerConfig } from "Config/ServerConfig";
import { Projeto, ProjetoSchema } from "Schemas/Project";
import { ProjetoController } from "./Project.controller";
import { ProjetoService } from "./Project.service";

@Module({
    imports : [
        MongooseModule.forFeature([
        { name : Projeto.name, schema : ProjetoSchema }
        ], ServerConfig.getEnv("CONNECTION_NAME"))
    ],
    controllers : [ProjetoController],
    providers : [ProjetoService],
})
export class ProjectModule 
{}