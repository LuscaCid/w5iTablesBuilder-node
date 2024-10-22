import { Body, Controller, Get, Param, Post, Put, UnauthorizedException } from "@nestjs/common";
import { DatabaseService } from "./Database.service";
import { ProjetoService } from "src/Projects/Project.service";
import { ModuloDiagramaService } from "src/ModuloDiagrama/moduloDiagrama.service";
import { Banco } from "Schemas/Database";
import { ModuloDiagrama } from "Schemas/ModuloDiagrama";

@Controller("banco")
export class DatabaseController 
{
  public constructor(
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
  async getBancoByIdProjeto( 
    @Param() params : {id_projeto : string; id_usuario : string}, 
  )
  {
    const bancos = await this.dbService.getBanksByProjectId(params.id_projeto);
    //se caso tentar buscar um banco o qual nao faz parte
    const userIsPartnerOfThisDatabase = await this.projectService.getUserProjects(
      {id_usuario : params.id_usuario}
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
  async addBanco (
    @Body() banco : Banco
  ) 
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
    return {
      data : response,
      statusCode : 201
    }
  }
  @Put("updateBanco")
  async updateBanco (
    @Body() banco : Banco
  )
  {
    const response = await this.dbService.updateBank(banco._id as string, banco);
  
    return {
        updatedDatabase : response,
        statusCode : 200
    };
  }
}