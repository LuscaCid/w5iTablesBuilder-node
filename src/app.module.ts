import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from '../Middleware/RouterHandler';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerConfig } from '../Config/ServerConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeModule } from './Node/Node.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      ServerConfig.getMongoDbConnectionString(), 
      ServerConfig.getMongoDbConfig()
    ), 
    //conexao para obtencao da conexao e injecao de conexao
    TypeOrmModule.forRoot(ServerConfig.getTypeOrmConfig()),
    NodeModule,
    
  ],
})
export class AppModule implements NestModule 
{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes("node", "banco", "script", "projeto")
  }
}