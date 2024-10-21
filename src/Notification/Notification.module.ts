import { Module } from "@nestjs/common";
import { NotificationService } from "./Notification.service";
import { NotificationController } from "./Notification.controller";

@Module({
    imports : [],
    providers : [NotificationService],
    controllers : [NotificationController]
})
export class NotificationModule 
{}