import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({collection : "modulo_diagrama", timestamps : true})
export class ModuloDiagrama 
{
    @Prop()
    _id? : string; 
    @Prop({type : String, required: true})
    id_banco : string;

    @Prop({type : String})
    nm_modulodiagrama : string;

    @Prop()
    cratedAt? : string;
    @Prop()
    updatedAt? : string;
}
export const ModuloDiagramaSchema = SchemaFactory.createForClass(ModuloDiagrama);
ModuloDiagramaSchema.set('collection', 'modulo_diagrama');