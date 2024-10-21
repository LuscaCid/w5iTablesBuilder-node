import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from 'mongoose';
import { Table, TableSchema } from "./Table";
import { Position, PositionSchema } from "./Position";

export type NodeDocument = HydratedDocument<Node> 

@Schema({ timestamps : true, collection : 'node'})
export class Node  extends Document
{
    @Prop({type : String, required : true})
    type : string;

    @Prop({ type : TableSchema })
    data : Table;
    @Prop({ type : PositionSchema })
    position : Position;
}
  
export const NodeSchema = SchemaFactory.createForClass(Node);
NodeSchema.set('collection', "node")
