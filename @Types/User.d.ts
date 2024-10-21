import { User } from "firebase/auth";
import { Document } from "mongoose";

export interface W5iUser extends User 
{
    _id : string;
}
export interface UserSettings extends Document
{
    id_usuario : string;
    animatedEdge : boolean;
    fitView : boolean;
    panOnScroll : boolean;
    minZoom : number;
    maxZoom : number;
    pannable : boolean;
    position : boolean;
}
