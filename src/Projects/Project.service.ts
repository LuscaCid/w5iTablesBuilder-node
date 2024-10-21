import { ServerConfig } from "Config/ServerConfig";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Projeto, ProjetoDocument } from "Schemas/Project";
import { UsuarioProjeto } from "Schemas/UserProject";
import { UsuarioProjetos } from "@Types/Projeto";
import { GetUserProjectsDTO } from "./DTO/GetUserProjects";
import { UserInviteProjetos } from "@Types/UserInvites";
import { Notification } from "Schemas/Notification";
import { UserInvite } from "Schemas/NotificationTypesSchemas/UserInviteToProject";

@Injectable()
export class ProjetoService
{
    public constructor (
        @InjectModel(Projeto.name, ServerConfig.getMongoDbName())
        private readonly projectRepo : Model<Projeto>,
        
        @InjectModel(UsuarioProjeto.name, ServerConfig.getMongoDbName())
        private readonly userProjectRepo : Model<UsuarioProjeto>,

        @InjectModel(Notification.name, ServerConfig.getMongoDbName())
        private readonly userInviteRepo : Model<UserInvite>
    )
    {}
    async getUserProjectsAndUsersInsideThisProjects(uid: string): Promise<ProjetoDocument[] | null> 
    {
        return await this.projectRepo.aggregate([
            {
                $match : { id_usuario : uid  }
            },
            {
                $lookup : {
                    from : "usuario_projeto",
                    localField : "_id",
                    foreignField : "id_projeto",
                    as : "users"
                }
            }
        ])    
    }
    async addProjeto (project : Projeto) 
    {
        return await this.projectRepo.create(project)[0];
    }
    async getProjectById(id_projeto : string): Promise<Projeto|null> 
    {
        return await this.projectRepo.findById(id_projeto);
    }
    async replaceProject(projeto: Projeto): Promise<Projeto | null> 
    {
        return await this.projectRepo.findOneAndReplace({_id : projeto._id}, projeto);
    }
    /**
     * @summary Exclui um projeto do banco de dados e os registros de usuarios atrelados a este projeto.
     * @param id_projeto 
     * @returns 
     */
    async deleteProjeto(id_projeto: string): Promise<Projeto|null> 
    {
        const projectDeleted = await this.projectRepo.findOneAndDelete({_id : id_projeto});
        await this.projectRepo.deleteMany({id_projeto : projectDeleted?.id});
        return projectDeleted
    }
    async getNotifications(id_usuario: string) 
    {
        // retorno das notificacoes do usuario encontrada pelo id do usuario passado como argumento para a funcao
        return await this.userInviteRepo.find({id_usuarioconvidado : id_usuario});
    }
    /***
     * @Summary Vai adicionar o usuario no projeto a partir de uma coleao terceira que faz somente este link
     * @author Lucas Cid 
     * @created 21/10/2024
     */
    async addUserToProject(args : UsuarioProjetos) 
    {
        //insere um usuario dentro de um projeto com um cargo e todas as demais informacoes necessarias
        return await this.userProjectRepo.create(args);
    }
    async getUserProjects(args: GetUserProjectsDTO) 
    {
        const userProjects = await this.userProjectRepo.find({id_usuario : args.id_usuario});
        if (userProjects.length > 0) 
        {
            const projects = await Promise.all(
                    userProjects.map( async (userProject) => {
                        const projeto = await this.projectRepo.findOne({_id : userProject.id_projeto}).exec()
                        //se trata de uma uniao entre duas colecoes, a de projetos para obtencao total das informacoes referente ao projeto e de cargo usuario em user_projects
                        return {
                            id_projeto : projeto?._id,
                            nm_projeto : projeto!.nm_projeto,
                            id_usuariocriador : projeto!.id_usuariocriador,
                            nm_usuariocriador : projeto!.nm_usuariocriador,
                            dt_criacao : projeto!.dt_criacao,
                            nm_arquivoicone : projeto!.nm_arquivoicone,
                            nu_cargo : userProject.nu_cargo,
                            createdAt : projeto?.createdAt,
                            updatedAt : projeto?.updatedAt
                        } 
                    }
                )
            ) 
            return projects ;
        }
        return []
    }
    async getUsuarioProjetoRole(id_usuario : string, id_projeto : string) 
    {
        //retornar os projetos a partir da colecao userprojects para que o usuario possa carregar o cargo juntamente com as informacoes pertinentes ao projeto o qual faz parte
        return await this.userProjectRepo.findOne({id_usuario, id_projeto});
    }
    /**
     * @summary Convida os usuarios para o projeto, porem se o convite ja foi enviado anteriormente, para nao sobrecarregar o banco, o convite nao é enviado.
     * @param invites 
     * @returns 
     */
    async inviteFriends( invites : UserInviteProjetos[]) 
    {
        const invitesForInsert = await Promise.all(
          invites.map(async (invite) => {
            const inviteAlreadyInserted = await this.userInviteRepo.findOne({
              id_projeto: invite.id_projeto,
              id_usuarioconvidador: invite.id_usuarioconvidador,
              id_usuarioconvidado: invite.id_usuarioconvidado,
            });
      
            return inviteAlreadyInserted ? null : invite;
          })
        );
        console.log(invitesForInsert);
        const filteredInvites = invitesForInsert.filter((invite) => invite !== null);
      
        console.log(filteredInvites);
        if (filteredInvites.length > 0) {
          return await this.userInviteRepo.insertMany(filteredInvites);
        }
        return [];
      }
    /**
     * @summary Apos a aceitacao do convite, o usuario vai ter um novo registro em usuarioprojeto, e o registro de convite eh apagado
     * @author Lucas Cid <lucasfelipaaa@gmail.com>
     * @param id_invite 
     */
    async acceptInvite(id_invite : string)
    {   
        //para aceitar um convite eh necessario que o convite tenha o status atualizado ou apagado, e um documento novo na colecao de usuario_projeto adicionado com a informacao de aceitacao para adentrar o projeto como um novo participante
        const inviteDeleted = await this.userInviteRepo.findOneAndDelete({_id : id_invite});
        return inviteDeleted;
    };
    async rejectInvite(id_invite : string) 
    {
        const inviteDeleted = await this.userInviteRepo.findOneAndDelete({_id : id_invite});
        return inviteDeleted;
    }
    async updateProject(projeto : Projeto) : Promise<Projeto>
    {
        return await this.projectRepo.findOneAndReplace({_id : projeto._id},projeto);
    }
    
    async getUserAlreadyInProject (id_usuario : string, id_projeto : string) : Promise<UsuarioProjeto | null> 
    {
        const userInProject = await this.userProjectRepo.findOne({id_usuario, id_projeto});
        return userInProject;
    }

   async updateUserRole(usuarioProjeto: UsuarioProjeto): Promise<UsuarioProjeto | null> 
   {
        return await this.userProjectRepo.findOneAndReplace({id : usuarioProjeto.id}, usuarioProjeto);
   }


    async getUserInvites (uid : string)
    {
        return await this.
    }

}