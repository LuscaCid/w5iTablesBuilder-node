import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserSettingsDocument = HydratedDocument<UserSettings>;

@Schema({collection: "usuario_config", timestamps : true})
export class UserSettings extends Document
{
  @Prop()
  id_usuario: string;

  @Prop()
  pannable: boolean;

  @Prop()
  panOnScroll: boolean;

  @Prop()
  animatedEdge: boolean;

  @Prop()
  fitView: boolean;

  @Prop()
  position: string;

  @Prop()
  minZoom: number;

  @Prop()
  maxZoom: number;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
UserSettingsSchema.set('collection', "usuario_settings");