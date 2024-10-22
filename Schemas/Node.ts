import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from 'mongoose';
import { Table, TableSchema } from "./Table";
import { Position, PositionSchema } from "./Position";

export type NodeDocument = HydratedDocument<Node> 

@Schema({ timestamps : true })
export class Node 
{
    @Prop({_id : true})
    _id? : string;

    @Prop({type : String, required : true})
    type : string;

    @Prop({ type : TableSchema })
    data : Table;
    @Prop({ type : PositionSchema })
    position : Position;
}
  
export const NodeSchema = SchemaFactory.createForClass(Node);
