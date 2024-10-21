import { Controller } from "@nestjs/common";
import { ScriptService } from "./Scripts.service";

@Controller("script")
export class ScriptController 
{
    public constructor(
        private readonly scriptService : ScriptService
    )
    {}
}