import { Position } from "./Position"
import { Tabela } from "./Table"

//informacao macro que vai compor o schema de node
export interface TableNode 
{
    data: Tabela
    position: Position
    deletable: boolean
    type: string
    id?: string
}