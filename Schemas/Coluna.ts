import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type ColunaDocument = HydratedDocument<Coluna>;

@Schema({ timestamps: true, autoCreate : false})
export class Coluna extends Document 
{
  @Prop({ required: true })
  nm_tabelacanvas: string;

  @Prop({ required: true })
  tp_colunacanvas: string;

  @Prop({ default: false })
  is_autoincrement: boolean;

  @Prop({ default: false })
  is_UUID: boolean;

  @Prop({ default: false })
  is_notnull: boolean;

  @Prop({ default: false })
  is_unique: boolean;

  @Prop({ default: false })
  is_foreignkey: boolean;

  @Prop({ default: false })
  is_primarykey: boolean;

  @Prop({ required: true })
  nm_colunacanvas: string;

  @Prop()
  nu_tamanho: string;

  @Prop({
    type: Object,
    default: {
      id_node: null,
      id_tabelasource: null,
      id_tabelatarget: null,
      availableForEdge: true,
    },
  })
  referencia: {
    id_node: string;
    id_tabelasource: string;
    id_tabelatarget: string;
    availableForEdge: boolean;
  };
}

export const ColunaSchema = SchemaFactory.createForClass(Coluna);
