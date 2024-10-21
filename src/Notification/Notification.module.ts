import { Module } from "@nestjs/common";
import { NotificationService } from "./Notification.service";
import { NotificationController } from "./Notification.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Notification, NotificationSchema } from "Schemas/Notification";
import { ServerConfig } from "Config/ServerConfig";

@Module({
    imports : [
        MongooseModule.forFeature([{
            name : Notification.name , schema : NotificationSchema
        }], ServerConfig.getEnv("CONNECTION_NAME"))
    ],
    providers : [NotificationService],
    controllers : [NotificationController]
})
export class NotificationModule 
{}