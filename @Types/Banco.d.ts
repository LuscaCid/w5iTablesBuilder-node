import { Document } from "mongoose";

interface Banco extends Document {
    id_banco? : string
    id_projeto : string;
    nm_banco: string;
    nm_senha: string;
    nm_usuario: string;
    nm_porta: number;
    nm_servidor?: string;
    createdAt? : string;
    updatedAt? : string;
    nm_usuariocriador : string;
}