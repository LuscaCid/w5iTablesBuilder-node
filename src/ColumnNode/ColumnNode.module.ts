import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServerConfig } from "Config/ServerConfig";
import { Coluna, ColunaSchema } from "Schemas/Coluna";
import { ColumnNodeController } from "./ColumnNode.controller";
import { ColumnNodeService } from "./ColumnNode.service";
import { Node, NodeSchema } from "Schemas/Node";

@Module({
    imports : [
        MongooseModule.forFeature([
            { name : Node.name, schema : NodeSchema }
          ], ServerConfig.getEnv("CONNECTION_NAME"))
    ],
    controllers : [ColumnNodeController],
    providers : [ColumnNodeService]
})
export class ColumnNodeModule 
{}