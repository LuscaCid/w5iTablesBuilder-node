import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServerConfig } from "Config/ServerConfig";
import { Coluna, ColunaSchema } from "Schemas/Coluna";
import { ColumnNodeController } from "./ColumnNode.controller";
import { ColumnNodeService } from "./ColumnNode.service";

@Module({
    imports : [
        MongooseModule.forFeature([
            { name : Coluna.name, schema : ColunaSchema }
          ], ServerConfig.getEnv("CONNECTION_NAME"))
    ],
    controllers : [ColumnNodeController],
    providers : [ColumnNodeService]
})
export class ColumnNodeModule 
{}