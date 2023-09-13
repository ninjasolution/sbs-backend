import {
    Prop,
    Schema,
    SchemaFactory
  } from '@nestjs/mongoose';
  import {
    Document
  } from 'mongoose';
  import { UUID } from "crypto";
  import * as bcrypt from 'bcrypt';
  
  export type UsersDocument = User & Document;
  
  @Schema()
  export class User {
    @Prop()
    firstname: string;
  
    @Prop()
    surname: string;
  
    @Prop()
    displayname: string;
  
    @Prop()
    email: string;
  
    @Prop()
    password: string;
  
    @Prop()
    role: string;
  
    @Prop()
    phone: string;
  
    @Prop()
    step: number;
  
    @Prop()
    rtime: number;

    @Prop()
    gender: string;
  
    @Prop()
    roles: [string];
  
    @Prop()
    verification: UUID;
  
    @Prop()
    verified: boolean;
  
    @Prop()
    verificationExpires: Date

    @Prop()
    blockExpires: Date;

    @Prop()
    loginAttempts: Number;

  }
  
  export const UserSchema = SchemaFactory.createForClass(User);

  
UserSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
