import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { GenericInvite, NotificationActions, NotificationStatus } from "@Types/UserInvites";
import { UserInvite, UserInviteSchema } from "./UserInviteToProject";
export class Notification implements GenericInvite 
{
    @Prop({type : String})
    id_usuarioconvidador : string;
    
    @Prop({type : String})
    nm_usuarioenviador : string;
    
    @Prop({type : String})
    ds_titulo?   : string;
    
    @Prop({type : String})
    ds_messagem? : string;
    
    @Prop({type : String})
    dt_convite?  : string;
    //status que podera e vai ser atualizado de acordo com a necessidade, 'aceito', entao os status sao trasferidos para accepted e assim por diante
    @Prop({
        enum : [
            "accepted",
            "rejected",
            "pending"
        ] satisfies NotificationStatus[]
    })
    status? : "pending" | "accpeted" | "rejected"
        // de acordo com o tipo de da notificacao, a informacao dentro de 'data' será diferente.
    @Prop({enum : [ 
        "alter-table",
        "create-database",
        "drop-database",
        "dont-accept",
        "drop-table",
        "remove-module-accept",
        "project-invite-accept",
    ] satisfies NotificationActions[]})
    action_type : NotificationActions
    
    @Prop({enum : [ UserInviteSchema ]})
    data : UserInvite //posteriormente ao decorrer da necessidade de novos tipos de notificacoes, vou adicionar nesta regiao de union types 
}

export const NotificationSchema = SchemaFactory.createForClass(Notification); 