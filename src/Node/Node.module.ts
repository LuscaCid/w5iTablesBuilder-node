import { Module } from "@nestjs/common";
import { NodeController } from "./Node.controller";
import { NodeService } from "./Node.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Node, NodeSchema } from "Schemas/Node";
import { ServerConfig } from "Config/ServerConfig";
@Module({
  imports : [
    MongooseModule.forFeature([
      { name : Node.name, schema : NodeSchema }
    ], ServerConfig.getEnv("CONNECTION_NAME"))
  ],
  providers : [ NodeService ],
  controllers : [ NodeController ]
})
export class NodeModule 
{}