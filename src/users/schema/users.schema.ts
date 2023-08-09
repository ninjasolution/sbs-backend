import {
    Prop,
    Schema,
    SchemaFactory
  } from '@nestjs/mongoose';
  import {
    Document
  } from 'mongoose';
  
  export type UsersDocument = Users & Document;
  
  @Schema()
  export class Users {
    @Prop()
    FirstName: string;
  
    @Prop()
    SurName: string;
  
    @Prop()
    Email: string;
  
    @Prop()
    Password: string;
  
    @Prop()
    Role: string;
  
    @Prop()
    Gender: string;
  }
  
  export const UsersSchema = SchemaFactory.createForClass(Users);