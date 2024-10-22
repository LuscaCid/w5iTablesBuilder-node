import { Pool, PoolConfig } from "pg";
import "dotenv/config";
import { InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Banco } from "Schemas/Database";

/**
 * @summary conexao com postgres para banco de dados w5isalvador onde havera a obtencao continua das tabelas ali presentes
 * @author Lucas Cid <lucasfelipaaa@gmail.com>
 */
export class DatabaseConnection 
{
    public constructor(){}
    static openConnection (settings : Banco) 
    {
        try 
        {
            const conn = new Pool({
                connectionString : `postgres://${settings.nm_usuario}:${settings.nm_senha}@${settings.nm_servidor}:${settings.nu_porta}/${settings.nm_banco}`,
            });
            return conn;
        } catch (err : unknown)
        {
            throw new InternalServerErrorException("Erro ao abrir conexao com postgres com o banco informado.")
        }
         
    }
}