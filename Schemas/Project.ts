import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type ProjetoDocument = HydratedDocument<Projeto>;

@Schema({ timestamps: true, collection : "projeto" })
export class Projeto extends Document
{
  @Prop()
  dt_criacao: Date;

  @Prop()
  nm_arquivoicone: string;

  @Prop()
  nm_projeto: string;

  @Prop()
  nm_usuariocriador: string;

  @Prop()
  id_usuariocriador: string;
  
  @Prop({options  : { timestamp : true }})
  createdAt : string;
  
  @Prop({options : { timestamp : true}})
  updatedAt : string;
}

export const ProjetoSchema = SchemaFactory.createForClass(Projeto);
// Adicionando o índice
ProjetoSchema.index({ usuario: 1 });
