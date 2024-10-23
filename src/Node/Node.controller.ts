import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from "@nestjs/common"
import { NodeService } from "./Node.service";
import { Node } from "Schemas/Node";
import { PositionUpdateArgs } from "Schemas/Position";
import { GetNodesDTO } from "./DTO/HttpArgs";

@Controller("node")
export class NodeController  
{
  public constructor (
    private readonly nodeService : NodeService
  ) 
  {}
  /**
   * @summary Rota de patch par atualizacao simples dentro da tabela de acordo com o nome da tabela e classe modelo
   * @author Lucas Cid <lucasfelipaaa@gmail.com>
   * @created 15/10/2024
   */
  @Patch("updateOne")
  @HttpCode(200)
  async updateNameAndModelClass(@Body() args: Node) 
  {
    const response = await this.nodeService.updateNameAndClass(args);
    return {
      response,
      message : "Atualizado com sucesso.",
    }
  }
  @Get("getMany")
  @HttpCode(200)
  async getBankModuleNodes(@Query() args: GetNodesDTO)
  {   
    const tabelas = await this.nodeService.getMany(args.id_banco, args.id_modulodiagrama);
    
    return {
      count : tabelas.length,
      data : tabelas,
    }
  }
  @Post("addOne")
  @HttpCode(201)
  async addTableNode(@Body() tabela : Node)
  {
    delete tabela._id;
    const nodeId = await this.nodeService.addOne(tabela);
    return {
      _id : nodeId,
      message : "Tabela adicionada com sucesso.",
    };
  }
  /**
   * @summary A funcao recebe como parametro na requisicao a obrigatoriedade de ser passado id do nó no campo "_id"
   * @author Lucas Cid 
   * @param arg 
   * @param res 
  */
 @Delete("deleteOne/:_id")
 @HttpCode(202)
 async deleteTableNode(@Param("_id") _id :  string) 
  {
    const nodeDeleted = await this.nodeService.deleteOne(_id);
    return {
      nodeDeleted,
      message : "Tabela excluída com sucesso."
    };
  }
  @Delete("deleteMany")
  async deleteTabelas (@Body() args : Node[]) 
  {
  } 
  @Patch("updatePosition")
  async updateTableNode(@Body() newNodePosition : PositionUpdateArgs) 
  {
    const updated = await this.nodeService.updateNodePosition(newNodePosition);
    return {
      updated,
      statusCode : 200
    };
  }
    @Post("addRand")
  async addOneRandowTest (@Body() tabela : Node) 
  {
    //elementos para floodar o banco de dados e testar a potencia do servidor
    const tableWithNewPosition  = [
        {
            "type": "table",
            "data": {
              "colunas": [
                {
                  "dt_criacao": "2024-08-26T20:30:00.527Z",
                  "id_colunacanvas": "novatabela_abc123_id_coluna_1a2b3c",
                  "is_UUID": true,
                  "is_autoincrement": false,
                  "is_foreignkey": true,
                  "is_notnull": true,
                  "is_primarykey": false,
                  "is_unique": true,
                  "nm_colunacanvas": "id_coluna_1a2b3c",
                  "nm_tabelacanvas": "novatabela_abc123",
                  "nu_tamanho": "255",
                  "tp_colunacanvas": "varchar",
                  "_id": "66ccda6333c8550b28f25cd1"
                }
              ],
              "id_banco": "66cf3652877c21af4463c974",
              "id_modulodiagrama": "66cf3652877c21af4463c976",
              "nm_classmodelo": "NovatabelaABC123",
              "nm_usuariocriador": "Lucas lima",
              "nm_tabelacanvas": "novatabela_abc123",
              "dt_criacao": "2024-08-26T20:30:00.527Z",
              "dt_atualizacao": "2024-08-26T20:30:00.527Z"
            },
            "isDeletable" : "false",
            "position": {
              "x": Math.round(Math.random() * 2000),
              "y": Math.round(Math.random() * 2000),
              "deletable": false
            }
        },
        {
            "type": "table",
            "data": {
              "colunas": [
                {
                  "dt_criacao": "2024-08-26T20:30:00.527Z",
                  "id_colunacanvas": "novatabela_abc123_id_coluna_1a2b3c",
                  "is_UUID": true,
                  "is_autoincrement": false,
                  "is_foreignkey": true,
                  "is_notnull": true,
                  "is_primarykey": false,
                  "is_unique": true,
                  "nm_colunacanvas": "id_coluna_1a2b3c",
                  "nm_tabelacanvas": "novatabela_abc123",
                  "nu_tamanho": "255",
                  "tp_colunacanvas": "varchar",
                  "_id": "66ccda6333c8550b28f25cd1"
                }
              ],
              "id_banco": "66cf3652877c21af4463c974",
              "id_modulodiagrama": "66cf3652877c21af4463c976",
              "nm_classmodelo": "NovatabelaABC123",
              "nm_usuariocriador": "Lucas lima",
              "nm_tabelacanvas": "novatabela_abc123",
              "dt_criacao": "2024-08-26T20:30:00.527Z",
              "dt_atualizacao": "2024-08-26T20:30:00.527Z"
            },
            "isDeletable" : "false",
            "position": {
              "x": Math.round(Math.random() * 2000),
              "y": Math.round(Math.random() * 2000),
              "deletable": false
            }
        }, {
            "type": "table",
            "data": {
              "colunas": [
                {
                  "dt_criacao": "2024-08-26T20:30:00.527Z",
                  "id_colunacanvas": "novatabela_abc123_id_coluna_1a2b3c",
                  "is_UUID": true,
                  "is_autoincrement": false,
                  "is_foreignkey": true,
                  "is_notnull": true,
                  "is_primarykey": false,
                  "is_unique": true,
                  "nm_colunacanvas": "id_coluna_1a2b3c",
                  "nm_tabelacanvas": "novatabela_abc123",
                  "nu_tamanho": "255",
                  "tp_colunacanvas": "varchar",
                  "_id": "66ccda6333c8550b28f25cd1"
                }
              ],
              "id_banco": "66cf3652877c21af4463c974",
              "id_modulodiagrama": "66cf3652877c21af4463c976",
              "nm_classmodelo": "NovatabelaABC123",
              "nm_usuariocriador": "Lucas lima",
              "nm_tabelacanvas": "novatabela_abc123",
              "dt_criacao": "2024-08-26T20:30:00.527Z",
              "dt_atualizacao": "2024-08-26T20:30:00.527Z"
            },
            "isDeletable" : "false",
            "position": {
              "x": Math.round(Math.random() * 2000),
              "y": Math.round(Math.random() * 2000),
              "deletable": false
            }
        }, {
            "type": "table",
            "data": {
              "colunas": [
                {
                  "dt_criacao": "2024-08-26T20:30:00.527Z",
                  "id_colunacanvas": "novatabela_abc123_id_coluna_1a2b3c",
                  "is_UUID": true,
                  "is_autoincrement": false,
                  "is_foreignkey": true,
                  "is_notnull": true,
                  "is_primarykey": false,
                  "is_unique": true,
                  "nm_colunacanvas": "id_coluna_1a2b3c",
                  "nm_tabelacanvas": "novatabela_abc123",
                  "nu_tamanho": "255",
                  "tp_colunacanvas": "varchar",
                  "_id": "66ccda6333c8550b28f25cd1"
                }
              ],
              "id_banco": "66cf3652877c21af4463c974",
              "id_modulodiagrama": "66cf3652877c21af4463c976",
              "nm_classmodelo": "NovatabelaABC123",
              "nm_usuariocriador": "Lucas lima",
              "nm_tabelacanvas": "novatabela_abc123",
              "dt_criacao": "2024-08-26T20:30:00.527Z",
              "dt_atualizacao": "2024-08-26T20:30:00.527Z"
            },
            "isDeletable" : "false",
            "position": {
              "x": Math.round(Math.random() * 2000),
              "y": Math.round(Math.random() * 2000),
              "deletable": false
            }
        },
    ]
    tableWithNewPosition.forEach(
    async (table) => {
      await this.nodeService.addOne(tabela);
    }
    );
    return {
      message : "Tabela adicionada com sucesso.",
      status : 200
    };
  }
    
  async addMany (@Body() nodes : Node[])
  {
    const response = await this.nodeService.addMany(nodes);
    return {
      data : response,
      statusCode : 200,
      message :"recuperadas do banco e criadas com sucesso!"
    }
  }
}