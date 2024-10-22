import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Coluna, ColunaSchema } from './Coluna';

export type TableDocument = HydratedDocument<Table>;

@Schema()
export class Table
{
  @Prop()
  nm_classmodelo: string;

  @Prop()
  nm_usuariocriador: string;

  @Prop()
  id_banco: string;

  @Prop({ default: Date.now })
  dt_criacao: Date;

  @Prop({ default: Date.now })
  dt_atualizacao: Date;

  @Prop({ required: true })
  nm_tabelacanvas: string;

  @Prop()
  id_modulodiagrama: string;

  @Prop({ default: false })
  deletable: boolean;

  @Prop({ type: [{ type: ColunaSchema }] })
  colunas: Coluna[];
}

export const TableSchema = SchemaFactory.createForClass(Table);
