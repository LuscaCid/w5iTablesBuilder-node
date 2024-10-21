import { Module } from "@nestjs/common";
import { NodeController } from "./Node.controller";
import { NodeService } from "./Node.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Node } from "Schemas/Node";
@Module({
  imports : [
    MongooseModule.forFeature([
      { name : Node.name, schema : Node }
    ])
  ],
  providers : [NodeService],
  controllers : [NodeController]
})
export class NodeModule 
{}