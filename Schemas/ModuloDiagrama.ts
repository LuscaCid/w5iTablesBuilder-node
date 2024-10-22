import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({collection : "modulo_diagrama", timestamps : true})
export class ModuloDiagrama extends Document
{
    @Prop()
    id_banco : string;

    @Prop()
    nm_modulodiagrama : string;
}
export const ModuloDiagramaSchema = SchemaFactory.createForClass(ModuloDiagrama);