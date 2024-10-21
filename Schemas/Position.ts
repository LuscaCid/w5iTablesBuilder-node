import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type PositionDocument = HydratedDocument<Position>;

@Schema()
export class Position extends Document
{
  @Prop({ required: true })
  x: number;

  @Prop({ required: true })
  y: number;
}

export const PositionSchema = SchemaFactory.createForClass(Position);
