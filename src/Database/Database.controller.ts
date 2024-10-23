import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException } from "@nestjs/common";
import { DatabaseService } from "./Database.service";
import { ProjetoService } from "src/Projects/Project.service";
import { ModuloDiagramaService } from "src/ModuloDiagrama/moduloDiagrama.service";
import { Banco } from "Schemas/Database";
import { ModuloDiagrama } from "Schemas/ModuloDiagrama";
import { NodeService } from "src/Node/Node.service";

@Controller("banco")
export class DatabaseController 
{
  public constructor(
    private readonly nodeService : NodeService,
    private readonly dbService : DatabaseService,
    private readonly projectService : ProjetoService,
    private readonly moduloDiagramaService : ModuloDiagramaService
  ) 
  {}
  /**
   * @summary Metoodo que vai retornar os bancos que foram criados dentro de projetos a partir do id do projeto passado com argumento
   * @param id_projeto 
   * @param id_usuario 
   * @returns 
   */
  @Get("get-project-banks/:id_projeto/:id_usuario")
  async getBancoByIdProjeto( @Param("id_projeto")  id_projeto : string, @Param("id_usuario") id_usuario : string)
  {
    const bancos = await this.dbService.getBanksByProjectId(id_projeto);
    //se caso tentar buscar um banco o qual nao faz parte
    const userIsPartnerOfThisDatabase = await this.projectService.getUserProjects(
      {id_usuario : id_usuario}
    );
    return {
      bancosRole : userIsPartnerOfThisDatabase,
      bancos,
      statusCode : 200,
    };
  };
  /**
   * @Summary Funcao que vai criar o banco virtualizado para que a aplicacao frontend possa resgatar as tabelas e injetar tambem
   * @implements Servico de modulo diagrama para poder criar o modulo principal na execucao deste script
   */
  @Post("addOne")
  async addBanco (@Body() banco : Banco) 
  {
    const projectExists = await this.projectService.getProjectById(banco.id_projeto);
    if (!projectExists) 
    {
      throw new UnauthorizedException("O projeto passado nao existe para poder ser atrelado a um banco de dados.");
    }
    const response = await this.dbService.addBankForProject(banco);
    //se nao for edicao, o id sera undefined
    if (!banco._id) 
    {
      await this.moduloDiagramaService.addOne({
        nm_modulodiagrama : "Principal",
        id_banco : response._id.toString(),
      } as ModuloDiagrama);
    }
    return response
  }
  @Put("updateOne")
  async updateBanco (@Body() banco : Banco)
  {
    //virá com o _id setado
    const response = await this.dbService.updateBank(banco._id as string, banco);
    return {
      updatedDatabase : response,
    };
  }
  @Delete("deleteOne/:_id")
  async deleteBanco (@Param("_id") _id : string) 
  {
    //é necessario excluir tambem os modulos diagrama atrelados ao banco e tabelas tambem
    await this.nodeService.deleteNodesByDatabaseId(_id)
    await this.moduloDiagramaService.deleteModulesByDatabaseId(_id);
    const responseDeleted = await this.dbService.deleteBank(_id);
    return {
      deletedDatabase : responseDeleted
    }
  }
}