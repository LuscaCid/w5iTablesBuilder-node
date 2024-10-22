import { Body, Controller, Delete, Get, HttpCode, Param,  /* Patch */  Post /*, UploadedFile, UseInterceptors */ } from "@nestjs/common";
import { ProjetoService } from "./Project.service";
import { DatabaseService } from "src/Database/Database.service";
import { GetUserProjectsDTO } from "./DTO/GetUserProjects";
import { Projeto } from "Schemas/Project";
import { UsuarioProjetos } from "@Types/Projeto";
import {  /* ApiConsumes, */ ApiCreatedResponse, ApiParam } from "@nestjs/swagger";
/*
import { FileInterceptor } from "@nestjs/platform-express";
import { AppError } from "src/utils/AppError";
*/
import { UserInviteProjetos } from "@Types/UserInvites";

@Controller("projeto")
export class ProjetoController 
{
    //extensoes de arquivos nao permitidos para upload da imagem
    static readonly NOT_PERMITED_EXTENSIONS = ["php", "xlsx", "csv", "js", "ts", "mp4", "mp3", "exe", "bat"];
    constructor (
        private readonly projectService : ProjetoService,
        private readonly bancoService : DatabaseService
    ){}
    @Get("/get-user-projects/:id_usuario")
    async getUserProjetos(@Param() param : GetUserProjectsDTO)
    { 
        const projetos = await this.projectService.getUserProjects(param); 
        return {
            projetos,
            statusCode : 200,
            customMessage : "Projetos do usuario" + param.id_usuario
        }
    };

    /**
     * @Summary Funcao que vai fazer o cadastro de um novo documento no mongodb relacionado ao projeto. Porem, podendo tambem receber o id do projeto, indicando que se trata de uma edicao, sendo assim, atualizando o projeto com as informacoes passadas pela requisicao
     * @param projeto 
     * @param res 
     * @returns 
     */
    @Post("/addOne")
    async addProjeto(@Body() projeto : Projeto) 
    {
        //se o id for passado, é porque se trata de uma edicao e esta informacao SÓ É CARREGADA QUANDO SE TRATA DE UM FORMULARIO QUE VAI CONTER UM PROJETO EM EDICAO
        if (projeto._id) 
        {
            const updateResponse = await this.projectService.updateProject(projeto);
            return {
                updateResponse,
                statusCode : 200
            }
        }
        // a funcao tem como base adicionar o projeto com a funcao create, porem, retorna a primeira posicao
        const response = await this.projectService.addProjeto(projeto);
        //apos adicionar o projeto, é necessario referenciar o criador do projeto na us er_projeto
        await this.projectService.addUserToProject({
            id_projeto : response._id.toString(), 
            id_usuario : projeto.id_usuariocriador, 
            nu_cargo :"1" 
        });
        return {
            data : response,
            statusCode : 201
        };
    }
    
    @ApiParam({
        name : "id_invite", 
        description : "Parametro para encontrar o convite que estiver de acordo com o id enviado como parametro"
    })
    @HttpCode(200)
    @Post("/accept-invite/:id_invite")
    async acceptProjetoInvite (@Param() id_invite :  string)
    {
        //aceitando o convite para participacao do projeto e depois criando o documento na colecao de usuario_projeto
        const response = await this.projectService.acceptInvite(id_invite)
        response.id
        const responseFromUserProjects = await this.projectService.addUserToProject({
            id_projeto : response.id_projeto, 
            id_usuario : response.id_usuarioconvidado, 
            nu_cargo : response.nu_cargo  
        });
        return response;
    }  
    @Delete("delete/:id_projeto")
    async deleteProjeto (@Param() id_projeto : string) 
    {
        const deletedProject = await this.projectService.deleteProjeto(id_projeto);
        /**
         * apos a delecao do projeto, deletar os bancos presentes nele, o BancoService, vai deletar tudo em cascta, 
         * os bancos presentes neste projeto, os modulos diagramas e as tabelas dentro dele tambem 
         */
        return {
            data : deletedProject,
            statusCode : 200,
        };
    }
    /**
     * @summary : adiciona um usuario a um projeto com base no 
     * @author Lucas Cid
     * @created 21/10/2024
     */
    @Post("add-user-project")
    async AddUserProject (@Body() body : UsuarioProjetos) 
    {
        const response = await this.projectService.addUserToProject(body);
        return {
            response,
            statusCode : 201
        };
    }

    /**
     * @summary Funcao que vai convidar usuarios em cascata com base num array de usuarios enviado como parametro pela rquisicao, pelo corpo da requisicao.
     * @author Lucas Cid <lucasfelipaaa@gmail.com>
     * @created 21/10/2024
     */
    @Post("invite-users") 
    @ApiCreatedResponse({description : "Usuarios convidados com sucesso"})
    async inviteUsersToProject(@Body() users : UserInviteProjetos[]) 
    {
        const invitationsResponse = await this.projectService.inviteFriends(users);
        return {
            invitationsResponse,
            status : 200
        };
    } 
    // WIP: WORK IN PROGRESS, a tratativa do upload de imagens em andamento para ter uma esterutura compativel ao envio de imagens para enbelezamento de projeto,

    //criar interceptador para obtencao dos files da requests...
    // @UseInterceptors(FileInterceptor('image'))
    // @ApiConsumes("multipart/form-data")
    // @Patch("add-img-projeto/:id_projeto")   
    // async updateProjectImage(@Param() id_projeto : string , @UploadedFile() file : Express.multer.file) 
    // {
    //     if (file.size > 1024 * 1024 * 5)
    //     {
    //         throw new AppError("O arquivo excedeu o limite de tamanho que é de 5mb", 401);
    //     }
    //     const dotIndex = file.filename.indexOf(".");
    //     const fileExtension = file.filename.trim().slice(dotIndex, file.filename.length);
    //     if (ProjetoController.NOT_PERMITED_EXTENSIONS.find(notAllowed =>  fileExtension === notAllowed)) 
    //     {
    //         throw new AppError("Arquivo inválido encontrado na requisicao.", 401);
    //     }
    //     //se ja possuir um caminho de arquivo alocado no posicionamento na model de ProjetoModel, ele apaga o arquivo na pasta e cria outro 
    //     const response = await this.projectService.execFileSave(file.filename, id_projeto);        
    //     return {
    //         data : response,
    //         statusCode : 200,
    //     }
    // }
    @Get("userProjects")//id do usuario authenticated
    async getAuthenticatedUserProjectsAndTheirUsers (@Param() uid : string) 
    {
        const response = await this.projectService.getUserProjectsAndUsersInsideThisProjects(uid!);
        return {
            response, 
            statusCode : 200,
        }
    }
    /**
     * @summary Metodo mais generalista que vai ser responsavel por retornar, de form mais generica, as notificacoes deste usuario com um uma estrutura padrao de notificacao e sempre uma schema propria da notificacao para que o processo fique dinamico.
     * @author Lucas Cid <lucasfelipaaa@gmail.com>
     * @created 18/10/2024
     */
    @Get("user-notifications/:uid")
    async getUserNotifications (@Param() uid : string ) 
    {
        //retornar as notificacoes cujo id_usuarioconvidado for igual ao uid passado como parametro 
        const response = await this.projectService.getUserInvites(uid) ;
        return {
            notifications : response,
            statusCode : 200,
            message : "Notificações do usuario."
        };
    }
}
 