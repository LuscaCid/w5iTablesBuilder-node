import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema()
export class Banco 
{
  @Prop()
  _id? : string;
  @Prop({ type: String, required: true })
  id_projeto: string;

  @Prop()
  nm_banco: string;

  @Prop()
  nm_senha: string;

  @Prop()
  nm_usuario: string;

  @Prop({type :  Number})
  nu_porta: number;

  @Prop()
  nm_servidor: string;

  @Prop()
  nm_usuariocriador: string;
}

export const BancoSchema = SchemaFactory.createForClass(Banco);
BancoSchema.set('collection', 'banco')
BancoSchema.index({ id_projeto: 1 });
