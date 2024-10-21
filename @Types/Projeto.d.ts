interface UsuarioProjetos 
{
    id_usuario : string;
    id_projeto : string;
    nu_cargo : keyof typeof cargos;
}

export const cargos = {
    "1" : "master", //tem como criar banco de dados no projeto, deletar, cria convites
    "2" : "admin",  //tem como criar banco de dados no projeto
    "3" : "editor"  //apenas cria tabelas
}

interface Projeto extends Document
{
    id_projeto? : string
    id_usuariocriador: string;
    nm_projeto : string;
    nm_usuariocriador : string;
    dt_criacao : string;
    nm_arquivoicone : string;
    createdAt : string;
    updatedAt : string;
}