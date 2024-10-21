import { Document } from "mongoose";

/**
 * @summary Se trata de uma forma de gerar notificacoes sobre acoes de forma dinamica sem necessariamente criar uma colecao para cada uma. Logo, esta eh uma interface mais dinamica para ser usada em outras mais especificas
 */
export interface GenericInvite extends Document
{
    action_type  : NotificationActions
    id_usuarioconvidador : string;
    nm_usuarioenviador : string;
    ds_titulo?   : string;
    ds_messagem? : string;
    dt_convite?  : string;
    status? : "pending" | "accpeted" | "rejected"
} 

export interface UserInviteProjetos extends GenericInvite 
{
    nu_cargo : string;
    id_projeto : string;
    id_usuarioconvidado : string;
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