import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Roles } from 'src/common';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    trim: true,
  })
  username:string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  })
  email: string;

  @Prop({
    required: true
  })
  password: string;

  @Prop({
    enum: [Roles.ADMIN, Roles.USER],
    default: Roles.USER,
  })
  role: Roles;
}

export const UserSchema = SchemaFactory.createForClass(User);
