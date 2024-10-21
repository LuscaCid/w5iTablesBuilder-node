import { Controller } from "@nestjs/common";
import { ModuloDiagramaService } from "./moduloDiagrama.service";

@Controller("modulo_diagrama")
export class ModuloDiagramaController 
{
    public constructor(
        private readonly ModuloDiagramaService: ModuloDiagramaService
    )
    {}
}