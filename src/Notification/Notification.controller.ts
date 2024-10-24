import { Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { NotificationService } from "./Notification.service";
import { Notification } from "Schemas/Notification";
@Controller("notificacao")
export class NotificationController 
{
    public constructor(
        private readonly notificationService: NotificationService
    )
    {}
    /**
     * @summary Metodo tem como funcao retornar as notificacoes, dentro da propriedade 'data' vai conter exatamente a informacao necessaria de acordo com a notificacao
     * @author Lucas Cid
     * @created 24/10/2024
     */
    @Get("user-notifications/:uid")
    public async getUserNotifications(@Param("uid") uid : string): Promise<Notification[]> 
    {
        const response = await this.notificationService.getUserNotifications(uid);
        return response
    }
    
    @Post("accept-invite/:_id")
    public async acceptProjectInvite (@Param("_id") _id : string)
    {
        const response = await this.notificationService.acceptInvite(_id);
        return response;
    }
    @Delete("reject-invite/:_id")
    async rejectProjectInvite (@Param("_id") _id : string) 
    {
        const response = await this.notificationService.rejectInvite(_id);
        return response;
    }
    // @Post("invite-user")
    // public async inviteUserToAProject (@Query() q : { }) 
    // {
    //     const response = await this.notificationService.sendInviteToBePartnerOfAProject();
    // }
} 