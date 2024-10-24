import { Module } from "@nestjs/common";
import { NotificationService } from "./Notification.service";
import { NotificationController } from "./Notification.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ServerConfig } from "Config/ServerConfig";
import { UsuarioProjeto, UsuarioProjetoSchema } from "Schemas/UserProject";
import { Notification, NotificationSchema } from "Schemas/Notification";

@Module({
    imports : [
        MongooseModule.forFeature([
            { name : Notification.name , schema : NotificationSchema },
            { name : UsuarioProjeto.name , schema : UsuarioProjetoSchema }
        ], ServerConfig.getEnv("CONNECTION_NAME"))
    ],
    providers : [NotificationService],
    controllers : [NotificationController]
})
export class NotificationModule 
{}