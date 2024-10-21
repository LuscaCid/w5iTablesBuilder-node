import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthMiddleware } from "Middleware/RouterHandler";
import { NodeController } from "./Node.controller";
import { NodeService } from "./Node.service";

@Module({
  providers : [NodeService],
  controllers : [NodeController]
})
export class NodeModule 
{}