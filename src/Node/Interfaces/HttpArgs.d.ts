import { ITabela } from "../TableNode";

export namespace TabelaParams 
{
    interface GetTableNodeArgs 
    {
        id_banco : string;
        id_modulodiagrama? : string;
    };
};

export interface GetNodesParams 
{
    id_banco : string;
    id_modulodiagrama? : string;
}