import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
export type PositionDocument = HydratedDocument<Position>;
@Schema()
export class Position
{
  @Prop({ required: true })
  x: number;

  @Prop({ required: true })
  y: number;
}
export const PositionSchema = SchemaFactory.createForClass(Position);
export interface PositionUpdateArgs 
{
  yPos : number; 
  xPos : number, 
  id_node : string
}
export type VariableTypes =  "boolean" | "varchar" | "text" | "int" | "float" | "double"| "char";
