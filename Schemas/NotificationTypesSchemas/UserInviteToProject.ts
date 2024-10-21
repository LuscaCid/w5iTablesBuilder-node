import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { cargos, KeyCargos } from "@Types/Projeto";
import { Notification } from "Schemas/Notification";

@Schema()
export class UserInvite extends Notification
{
    @Prop({type : String})
    id_projeto : string;
    
    @Prop({enum : ["1", "2", "3"] satisfies KeyCargos[]})
    nu_cargo : KeyCargos ;

    @Prop({type : String})
    id_usuarioconvidado : string;
}

export const UserInviteSchema = SchemaFactory.createForClass(UserInvite);