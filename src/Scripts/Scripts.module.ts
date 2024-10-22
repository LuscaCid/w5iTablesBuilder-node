import { Module } from "@nestjs/common";
import { ScriptController } from "./Scripts.controller";
import { ScriptService } from "./Scripts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MongooseModule } from "@nestjs/mongoose";
import { Banco, BancoSchema } from "Schemas/Database";
import { ModuloDiagrama, ModuloDiagramaSchema } from "Schemas/ModuloDiagrama";
import { ServerConfig } from "Config/ServerConfig";
import { DatabaseService } from "src/Database/Database.service";

@Module({
    providers : [ ScriptService, DatabaseService ],
    imports : [ MongooseModule.forFeature(
        [
            { name : Banco.name, schema : BancoSchema },
            { name : ModuloDiagrama.name, schema : ModuloDiagramaSchema },
        ], 
        ServerConfig.getEnv("CONNECTION_NAME")
    ) ],
    controllers : [ ScriptController ]
})
export class ScriptsModule {}