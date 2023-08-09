import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VerificationDocument = Verification & Document;

@Schema()
export class Verification {
    @Prop()
    signature1: BinaryType;
    @Prop()
    signature2: BinaryType;
    @Prop()
    owner1: BinaryType;
    @Prop()
    owner2: BinaryType;
    @Prop()
    owner3: BinaryType;
    @Prop()
    owner4: BinaryType;
    @Prop()
    UserId: string;
};

export const VerificationSchema = SchemaFactory.createForClass(Verification);
