import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { NotificationService } from "./Notification.service";
import { Notification  } from "Schemas/Notification";
@Controller("notificacao")
export class NotificationController 
{
    public constructor(
        private readonly notificationService: NotificationService
    )
    {}
    
    @Get("user-notifications/:uid")
    public async getUserNotifications(@Param() uid : string): Promise<Notification[]> {
        const response = await this.notificationService.getUserNotifications(uid);
        return response
    }

    
    @Post("invite-user")
    public async inviteUserToAProject (@Query() q : { }) 
    {
        const response = await this.notificationService.sendInviteToBePartnerOfAProject();
    }
}