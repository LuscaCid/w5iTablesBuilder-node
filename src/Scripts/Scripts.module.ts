import { Module } from "@nestjs/common";
import { ScriptController } from "./Scripts.controller";

@Module({
    imports : [],
    exports : [],
    controllers : [ScriptController]
})
export class ScriptsModule {}