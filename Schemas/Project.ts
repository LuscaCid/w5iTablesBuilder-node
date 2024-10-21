import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type ProjetoDocument = HydratedDocument<Projeto>;

@Schema({ timestamps: true })
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
}

export const ProjetoSchema = SchemaFactory.createForClass(Projeto);
// Adicionando o índice
ProjetoSchema.index({ usuario: 1 });
