import { Coluna } from "Schemas/Coluna";

export type VariableTypes =  "boolean" | "varchar" | "text" | "int" | "float" | "double"| "char";
export interface ColumnWithHisTables extends Coluna
{
    nm_tabelacanvas : string;
    referenced_table? : string;
    referenced_column?: string;
}
export const typesDictionary : Record<SqlTypes, VariableTypes>= {
    "character varying" : "boolean",
    "character" : "char",
    "integer" : "int",
    "smallint" : "text",
    "text" : "text",
 }
export type SqlTypes = "character varying" | "character" | "smallint" | "text" | "integer"