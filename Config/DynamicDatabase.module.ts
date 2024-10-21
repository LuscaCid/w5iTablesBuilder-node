import { Module } from "@nestjs/common";
import { DynamicDatabaseService } from "./DynamicDatabase.service";

@Module({
    providers :[DynamicDatabaseService],
    //para que outros modulos possam fzr conexao
    exports : [DynamicDatabaseService]
})
export class DynamicDatabaseModule {}