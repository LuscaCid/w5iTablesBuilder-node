import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StringFormat } from 'firebase/storage';
import { Document } from 'mongoose';

@Schema({collection : "banco", timestamps : true})
export class Banco extends Document
{
  @Prop({ type: String, required: true })
  id_projeto: string;

  @Prop()
  nm_banco: string;

  @Prop()
  nm_senha: string;

  @Prop()
  nm_usuario: string;

  @Prop()
  nu_porta: string;

  @Prop()
  nm_servidor: string;

  @Prop()
  nm_usuariocriador: string;

  @Prop({type : String, required:  false})
  ds_cert? : string;
}

export const BancoSchema = SchemaFactory.createForClass(Banco);
BancoSchema.set('collection', 'banco')
BancoSchema.index({ id_projeto: 1 });
