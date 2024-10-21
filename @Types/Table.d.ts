import { Coluna } from "./Column"

export interface Tabela 
{
    colunas: Coluna[]
    nm_classmodelo: string
    nm_usuariocriador: string
    id_banco: string
    dt_criacao: string
    dt_atualizacao: string
    nm_tabelacanvas: string
    id_modulodiagrama: string
}