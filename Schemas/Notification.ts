import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { GenericInvite, NotificationActions, NotificationStatus, UserInviteProjetos } from "@Types/UserInvites";
@Schema({collection : "notificacao"})
export class Notification implements GenericInvite<UserInviteProjetos> 
{
    @Prop({type : String})
    id_usuarioconvidador : string;
    
    @Prop({type : String})
    id_usuarioconvidado : string;
    
    @Prop({type : String})
    nm_usuarioenviador : string;
    
    @Prop({type : String})
    ds_titulo   : string;
    
    @Prop({type : String})
    ds_messagem : string;
    
    @Prop({type : String})
    dt_convite  : string;
    //status que podera e vai ser atualizado de acordo com a necessidade, 'aceito', entao os status sao trasferidos para accepted e assim por diante
    @Prop({type : String})
    status : NotificationStatus
        // de acordo com o tipo de da notificacao, a informacao dentro de 'data' será diferente.
    @Prop({type : String})
    action_type : NotificationActions
    
    @Prop({type : Object})
    data : UserInviteProjetos //posteriormente ao decorrer da necessidade de novos tipos de notificacoes, vou adicionar nesta regiao de union types 
}

export const NotificationSchema = SchemaFactory.createForClass(Notification); 