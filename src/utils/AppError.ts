export class AppError{
    message : string;
    status : number;
    constructor(message : string, status = 401){
        this.message = message;
        this.status = status;
    }
}
