import { Document } from "mongoose";

interface Banco extends Document {
    _id? : string;
    id_projeto : string;
    nm_banco: string;
    nm_senha: string;
    nm_usuario: string;
    nu_porta: number;
    nm_servidor?: string;
    nm_usuariocriador : string;
    nu_cargo? : string;
    createdAt : string;
    updatedAt : string
}