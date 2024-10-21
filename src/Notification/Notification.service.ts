import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Notification } from "Schemas/Notification";
import { ServerConfig } from "Config/ServerConfig";
@Injectable()
export class NotificationService 
{
    public constructor(
        @InjectModel(Notification.name, ServerConfig.getMongoDbName())
        private readonly notificationRepository : Model<Notification>
    )
    {}

    async getUserNotifications(uid : string)
    {
        const response = await this.notificationRepository.find({})
        return response;
    }
    
    
}