import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import { Document, Types } from 'mongoose';

export type VerificationDocument = Verification & Document;

@Schema()
export class Verification {
    @Prop()
    investor1: string;
    @Prop()
    investor1Sign: Buffer;
    @Prop()
    investor2: string;
    @Prop()
    investor2Sign: Buffer;
    @Prop()
    owner1: string;
    @Prop()
    owner1Sign: Buffer;
    @Prop()
    owner2: string;
    @Prop()
    owner2Sign: Buffer;
    @Prop()
    owner3: string;
    @Prop()
    owner3Sign: Buffer;
    @Prop()
    owner4: string;
    @Prop()
    owner4Sign: Buffer;
    @Prop()
    selectedImage: Buffer;
    @Prop()
    frontScreen: Buffer;
    @Prop()
    backScreen: Buffer;
    @Prop({
        unique: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    userId: Types.ObjectId;
};

export const VerificationSchema = SchemaFactory.createForClass(Verification);
