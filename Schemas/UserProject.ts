import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UsuarioProjetos } from '@Types/Projeto';
import { Document, HydratedDocument } from 'mongoose';

export type UsuarioProjetosDocument = HydratedDocument<UsuarioProjetos>;

@Schema({collection : "usuario_projeto"})
export class UsuarioProjeto extends Document
{
  @Prop()
  id_projeto: string;

  @Prop()
  id_usuario: string;

  @Prop()
  nu_cargo: string;
}

export const UsuarioProjetoSchema = SchemaFactory.createForClass(UsuarioProjeto);
UsuarioProjetoSchema.set('collection', "usuario_projeto");