import { Controller } from "@nestjs/common";

@Controller("script")
export class ScriptController 
{
    public constructor(
        private readonly scriptService : ScriptService
    )
    {}
}