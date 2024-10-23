import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from '../Middleware/RouterHandler';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerConfig } from '../Config/ServerConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeModule } from './Node/Node.module';
import { ColumnNodeModule } from './ColumnNode/ColumnNode.module';
import { DatabaseModule } from './Database/Database.module';
import { ProjectModule } from './Projects/Project.module';
import { NotificationModule } from './Notification/Notification.module';
import { ScriptsModule } from './Scripts/Scripts.module';
import { ModuloDiagramaModule } from './ModuloDiagrama/moduloDiagrama.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      ServerConfig.getMongoDbConnectionString(), 
      ServerConfig.getMongoDbConfig()
    ), 
    //conexao para obtencao da conexao e injecao de conexao
    NodeModule,
    ColumnNodeModule,
    DatabaseModule,
    ProjectModule,
    NotificationModule,
    ScriptsModule,
    ModuloDiagramaModule
  ],
})
export class AppModule
{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes("node", "banco", "script", "projeto", "usuario_projeto")
  }
}