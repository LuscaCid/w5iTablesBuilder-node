import { Document } from "mongoose";

/**
 * @summary Se trata de uma forma de gerar notificacoes sobre acoes de forma dinamica sem necessariamente criar uma colecao para cada uma. Logo, esta eh uma interface mais dinamica para ser usada em outras mais especificas
 */
export interface GenericInvite<T extends UserInviteProjetos>
{
    _id? : string
    action_type  : NotificationActions
    id_usuarioconvidador : string;
    id_usuarioconvidado : string;
    nm_usuarioenviador : string;
    ds_titulo?   : string;
    ds_messagem? : string;
    dt_convite?  : string;
    data : T;
    status? : NotificationStatus
} 
export interface UserInviteProjetos extends GenericInvite 
{
    nu_cargo : string;
    id_projeto : string;
}
// a partir das possibilidades de notificacoes, a que condizer com alguma destas vai emitir uma funcao que vai realizar alguma movimentacao referente a notificacao
export type NotificationActions = 
"dont-accept" |
"project-invite-accept" | 
"drop-table" | 
"create-database" | 
"drop-database" | 
"alter-table" | 
"remove-module-accept";

export type NotificationStatus = "accepted" | "rejected" | "pending"