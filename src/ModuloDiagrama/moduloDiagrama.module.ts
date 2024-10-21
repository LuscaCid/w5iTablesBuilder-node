import { Module } from "@nestjs/common";
import { ModuloDiagramaController } from "./moduloDiagrama.controller";
import { ModuloDiagramaService } from "./moduloDiagrama.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ServerConfig } from "Config/ServerConfig";
import { ModuloDiagrama, ModuloDiagramaSchema } from "Schemas/ModuloDiagrama";

@Module({
    imports : [
        MongooseModule.forFeature([
            { name : ModuloDiagrama.name, schema : ModuloDiagramaSchema }
        ], ServerConfig.getEnv("CONNECTION_NAME"))
    ],
    providers : [ModuloDiagramaService],
    controllers : [ModuloDiagramaController],
})
export class ModuloDiagramaModule {}