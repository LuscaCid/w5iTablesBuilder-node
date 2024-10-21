import { Controller } from "@nestjs/common";
import { ProjetoService } from "./Projeto.service";

@Controller("projeto")
export class ProjetoController 
{
    public constructor(
        private readonly ProjetoService : ProjetoService
    )
    {}

}