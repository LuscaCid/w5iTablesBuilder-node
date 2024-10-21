import { DatabaseService } from "./Database.service";

export class DatabaseController 
{
    public constructor(
        private readonly dbService : DatabaseService
    ) 
    {}
}