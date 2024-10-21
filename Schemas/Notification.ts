import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({collection : 'notification', timestamps : true})
export class Notification extends Document
{
    @Prop({type : String})
    id_usuarioconvidador : string;

    @Prop({type : String})
    id_usuarioconvidado : string;
    
    @Prop({type : String})
    message : string;

}
//estrutura para uma notificacao,

export const NotificationSchema = SchemaFactory.createForClass(Notification);