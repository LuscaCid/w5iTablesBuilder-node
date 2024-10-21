import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({collection : "modulo_diagrama", timestamps : true})
export class ModuloDiagrama extends Document
{
    @Prop({type : String, required: true})
    id_banco : string;
    
    @Prop({type : String, required: true})
    id_modulodiagrama : string;
}

export const ModuloDiagramaSchema = SchemaFactory.createForClass(ModuloDiagrama);
ModuloDiagramaSchema.set('collection', 'modulo_diagrama');