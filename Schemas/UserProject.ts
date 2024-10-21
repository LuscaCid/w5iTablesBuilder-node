import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UsuarioProjetosDocument = HydratedDocument<UsuarioProjetos>;

@Schema()
export class UsuarioProjetos extends Document
{
  @Prop()
  id_projeto: string;

  @Prop()
  id_usuario: string;

  @Prop()
  nu_cargo: string;
}

export const UsuarioProjetoSchema = SchemaFactory.createForClass(UsuarioProjetos);
UsuarioProjetoSchema.set('collection', "usuario_projeto");