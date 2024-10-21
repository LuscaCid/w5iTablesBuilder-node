import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UserInvite {
    @Prop({type : String})
    id_projeto : string;

}

export const UserInviteSchema = SchemaFactory.createForClass(UserInvite);