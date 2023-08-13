import {
    Prop,
    Schema,
    SchemaFactory
  } from '@nestjs/mongoose';
  import {
    Document
  } from 'mongoose';
  
  export type UsersDocument = User & Document;
  
  @Schema()
  export class User {
    @Prop()
    firstname: string;
  
    @Prop()
    surname: string;
  
    @Prop()
    email: string;
  
    @Prop()
    password: string;
  
    @Prop()
    role: string;
  
    @Prop()
    gender: string;
  
    @Prop()
    roles: [string];

  }
  
  export const UserSchema = SchemaFactory.createForClass(User);