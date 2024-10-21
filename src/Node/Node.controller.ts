import { Controller } from "@nestjs/common"
import { NodeService } from "./Node.service";

@Controller("node")
export class NodeController  
{
    public constructor (
        private readonly NodeService : NodeService
    ) 
    {}
    
}