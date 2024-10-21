import { ServerConfig } from "Config/ServerConfig";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Projeto } from "Schemas/Project";

@Injectable()
export class ProjetoService
{
    public constructor (
        @InjectModel(Projeto.name, ServerConfig.getMongoDbName())
        private readonly ProjetoRepo : Model<Projeto>
    )
    {}
    
}