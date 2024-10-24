import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ServerConfig } from "Config/ServerConfig";
import { Notification } from "Schemas/Notification";
import { UsuarioProjeto } from "Schemas/UserProject";
@Injectable()
export class NotificationService 
{
    public constructor(
        @InjectModel(Notification.name, ServerConfig.getMongoDbName())
        private readonly notificationRepository : Model<Notification>,
        @InjectModel(UsuarioProjeto.name, ServerConfig.getMongoDbName())
        private readonly userProjectRepository : Model<UsuarioProjeto>
    )
    {}
    /***
     * @Summary Vai adicionar o usuario no projeto a partir de uma coleao terceira que faz somente este link
     * @author Lucas Cid 
     * @created 21/10/2024
     */
    async getUserNotifications(uid : string)
    {
        const response = await this.notificationRepository.find({ id_usuarioconvidado : uid })
        return response;
    }
    async acceptInvite (uid : string) 
    {
        const deletedNotification = await this.notificationRepository.findOneAndDelete({
            _id : uid
        });
        console.log(deletedNotification);
        const userProjectDocument = await this.userProjectRepository.findOneAndUpdate(
            {
                id_projeto : deletedNotification.data.id_projeto,
                id_usuario : deletedNotification.id_usuarioconvidado,
            },
            {
                id_projeto : deletedNotification.data.id_projeto,     
                id_usuario : deletedNotification.id_usuarioconvidado, 
                nu_cargo : deletedNotification.data.nu_cargo
            },
            { new : true }
        );
        return userProjectDocument;
    }
    async rejectInvite(uid : string) 
    {
        return await this.notificationRepository.findOneAndDelete({_id : uid});
    }
}