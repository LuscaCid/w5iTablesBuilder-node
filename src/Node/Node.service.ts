import { ServerConfig } from "Config/ServerConfig";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Node } from "Schemas/Node";
import { Model } from "mongoose";

@Injectable()
export class NodeService
{
    public constructor (
        @InjectModel(Node.name, ServerConfig.getMongoDbName())
        private readonly NodeRepo : Model<Node>
    )
    {}
    
}