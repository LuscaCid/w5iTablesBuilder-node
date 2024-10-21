export interface Coluna 
{
    _id : string
    dt_criacao: string
    tp_colunacanvas: string
    is_autoincrement: boolean
    is_UUID: boolean
    is_notnull: boolean
    is_unique: boolean
    nm_tabelacanvas : string
    is_foreignkey: boolean
    is_primarykey: boolean
    nm_colunacanvas: string
    nu_tamanho: string
    referencia? : Referencia
}