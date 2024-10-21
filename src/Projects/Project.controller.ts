import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ProjetoService } from "./Project.service";
import { DatabaseService } from "src/Database/Database.service";
import { GetUserProjectsDTO } from "./DTO/GetUserProjects";
import { Projeto } from "Schemas/Project";
import { UsuarioProjetos } from "@Types/Projeto";
import { ApiConsumes, ApiCreatedResponse } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { AppError } from "src/utils/AppError";

@Controller("projeto")
export class ProjetoController 
{
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
        //se o id for passado, é porque se trata de uma edicao
        if (projeto._id) 
        {
            const updateResponse = await this.projectService.updateProject(projeto);
            return {
                updateResponse,
                statusCode : 200
            }
        }
        const response = await this.projectService.addProjeto(projeto);
        await this.projectService.addUserToProject({
            id_projeto : response.id, 
            id_usuario : projeto.id_usuariocriador, 
            nu_cargo :"1" 
        });
        return {
            data : response,
            statusCode : 201
        };
    }
    
    @Post("/accept-invite/:id_invite")
    async acceptProjetoInvite (@Param() id_invite :  string)
    {
        const response = await this.projectService.acceptProjetoInvite(id_invite)
        return response;
    }  
    @Delete("delete")
    async deleteProjeto (@Param() {id_projeto} : {id_projeto : string}) 
    {
        const deletedProject = await this.projectService.deleteProject(id_projeto);
        /**
         * apos a delecao do projeto, deletar os bancos presentes nele, o BancoService, vai deletar tudo em cascta, 
         * os bancos presentes neste projeto, os modulos diagramas e as tabelas dentro dele tambem 
         */
        return {
            data : deletedProject,
            statusCode : 200,
        };
    }
    @Post("add-user-project")
    async AddUserProject (@Body() body : UsuarioProjetos) 
    {
        const response = await this.projectService.addUserToProject(body);
        return {
            response,
            statusCode : 201
        };
    }

    @Post("invite-users") 
    @ApiCreatedResponse({description : "Usuarios convidados com sucesso"})
    async inviteUsersToProject(@Body() users : IProjetoCommunity.UserInviteProjetos[]) 
    {
        const invitationsResponse = await this.projectService.inviteUsersForAProject(users);
        return {
            invitationsResponse,
            status : 200
        };
    } 
    //criar interceptador para obtencao dos files da requests...
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes("multipart/form-data")
    @Patch("add-img-projeto/:id_projeto")   
    async updateProjectImage(@Param() id_projeto : string , @UploadedFile() file : Express.multer.file) 
    {
        if (file.size > 1024 * 1024 * 5)
        {
            throw new AppError("O arquivo excedeu o limite de tamanho que é de 5mb", 401);
        }
        const dotIndex = file.filename.indexOf(".");
        const fileExtension = file.filename.trim().slice(dotIndex, file.filename.length);
        if (ProjetoController.NOT_PERMITED_EXTENSIONS.find(notAllowed =>  fileExtension === notAllowed)) 
        {
            throw new AppError("Arquivo inválido encontrado na requisicao.", 401);
        }
        //se ja possuir um caminho de arquivo alocado no posicionamento na model de ProjetoModel, ele apaga o arquivo na pasta e cria outro 
        const response = await this.projectService.execFileSave(file.filename, id_projeto);        

        return {
            data : response,
            statusCode : 200,
          o."
        }).status(200)
    }
    @Get("userProjects")//id do usuario authenticated
    async getAuthenticatedUserProjectsAndTheirUsers (@Req req : Request) 
    {
        const { user : { uid } } = req;

        const response = await this.projectService.getUserProjectsAndUsersInsideThisProjects(uid!);
        return {
            response, 
            statusCode : 200,
          o usuario logado" + uid
        }).status(200);
    }
    /**
     * @summary Metodo mais generalista que vai ser responsavel por retornar, de form mais generica, as notificacoes deste usuario com um uma estrutura padrao de notificacao e sempre uma schema propria da notificacao para que o processo fique dinamico.
     * @author Lucas Cid <lucasfelipaaa@gmail.com>
     * @created 18/10/2024
     */
    @Get("user-notifications/:uid")
    async getInvites (@Params req : { uid : string }) 
    {
        const { uid } = req;

        const response = await this.projectService.getUserInvites(uid) ;
        return res.status(200).json({
            notifications : response,
            statusCode : 200,
            message : "Notificações do usuario."
        });
    }

}