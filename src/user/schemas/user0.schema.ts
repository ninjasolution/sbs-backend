import { isUUID, isEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
import {
    Prop,
    Schema,
    SchemaFactory
  } from '@nestjs/mongoose';
  import {
    Document
  } from 'mongoose';
  
  export type UserDocument = User & Document;
  
  @Schema()
  export class User {
    @Prop({
        maxlength: 255,
        trim:true
    })
    FirstName: string;
  
    @Prop({
        maxlength: 255,
        trim:true
    })
    SurName: string;
  
    @Prop({
        maxlength: 255,
        trim:true
    })
    displayName: string;
  
    @Prop({
        lowercase: true,
        validate: isEmail,
        maxlength: 255,
        required: [true, 'EMAIL_IS_BLANK'],
        trim:true
    })
    Email: string;
  
    @Prop({
        maxlength: 64,
        required: [true, 'PASSWORD_IS_BLANK'],
    })
    Password: string;
  
    @Prop({
        type: [String],
        default: ['user'],
    })
    Roles: [string];
  
    @Prop({
        maxlength: 255,
    })
    Gender: string;

    @Prop({
        type: String,
        validate: isUUID,
    })
    verification;
    @Prop({
        type: Boolean,
        default: false,
    }) verified;
    @Prop({
        type: Date,
        default: Date.now,
    }) verificationExpires;
    @Prop({
        type: Number,
        default: 0,
    }) loginAttempts;
    @Prop({
        type: Date,
        default: Date.now,
    }) blockExpires;

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
