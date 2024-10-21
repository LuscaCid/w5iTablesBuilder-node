import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ServerConfig } from "Config/ServerConfig";
import mongoose, { Model } from "mongoose";
import { Banco, BancoDocument } from "Schemas/Database";

@Injectable()
export class DatabaseService 
{
    public constructor(
        @InjectModel(Banco.name, ServerConfig.getMongoDbName())
        private readonly dbRepo : Model<Banco>
    )
    {}
    
    async deleteBank(id_banco: string): Promise<BancoDocument | null> 
    {
        return await this.dbRepo.findOneAndDelete({_id : id_banco});
    };
    
    async getBankById(id_banco: string): Promise<BancoDocument | null> 
    {
        return await this.dbRepo.findById(id_banco);
    }

     //@/ Funcao que deletará bancos de um projeto, ou seja, delecao pelo id do projet
    async deleteBanksByProjectId(id_projeto: string): Promise<BancoDocument[]|null> 
    {
        //execucao de delecao de documentos para cada id de banco enviado como argumento.
        const idConverted = new mongoose.Types.ObjectId(id_projeto);
        return await this.dbRepo.findByIdAndDelete(idConverted);
    }; 
    async getBanksByProjectId(id_projeto: string): Promise<BancoDocument[]> 
    {
        const converted = new mongoose.Types.ObjectId(id_projeto);
        const data = await this.dbRepo.find({id_projeto : converted });
        return data;
    };
    async addBankForProject(banco: BancoDocument): Promise<BancoDocument|null> 
    {
        return await this.dbRepo.create(banco);
    };
    async updateBank(id: string, banco: BancoDocument): Promise<BancoDocument | null> 
    {
        return await this.dbRepo.findOneAndUpdate({_id : id}, banco);
    }
    async getBankWithTheSameNameInCurrentProject(id_projeto : string, nm_banco: string): Promise<BancoDocument|null> 
    {
        return await this.dbRepo.findOne({nm_banco, id_projeto});
    }

}