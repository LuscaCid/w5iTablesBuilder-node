import { MongooseModuleOptions } from "@nestjs/mongoose";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import "dotenv/config"
export class ServerConfig
{
    public static getEnv (key : string, throwOnMissing = false) {
        const value = process.env[key];
        if (!value && throwOnMissing)  
            throw new Error("Valor nao encontrado em dotenv para ^" + key)   
        return value
    }
    public static getTypeOrmConfig () : TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: ServerConfig.getEnv("APP_HOST"),
            port: parseInt(ServerConfig.getEnv("DB_PORT")),
            username: ServerConfig.getEnv("APP_USER"),
            password: ServerConfig.getEnv("APP_PASSWORD"),
            database: ServerConfig.getEnv("APP_DATABASE"),
            entities: ServerConfig.getListOfModels(),
            synchronize: false,
            ssl:
            {
              rejectUnauthorized: false,
              ca: this.getEnv("CERTIFICATE"),
            },
        }
    }
    public static getMongoDbConnectionString () 
    {
        return this.getEnv("CONNECTION_STRING", true);
    }
    public static getMongoDbConfig() 
    {
        return {
            dbName :  this.getEnv("MAIN_DATABASE", true),
            connectionName : this.getEnv("CONNECTION_NAME", true),
            retryAttempts : 4,
            connectTimeoutMS : 2000,
            
        } satisfies MongooseModuleOptions;
    }
    public static getMongoDbName() 
    {
        return this.getEnv("CONNECTION_NAME", true)
    }
    public static isDevelopment() 
    {
        return this.getEnv("IS_DEVELOPMENT") == "true" ? true : false ;
    }
    /**
     * @summary Retorno das schemas necessasrias para manipulacao do banco de dados atraves das models sendo utilizadas como repository
     * @author Lucas Cid <lucasfelipaaa@gmail.com>
     * @created 18/10/2024
     */
    private static getListOfModels () 
    {
        return []
    }
}