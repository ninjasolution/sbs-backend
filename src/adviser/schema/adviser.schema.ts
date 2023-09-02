import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsUUID } from 'class-validator';
import { Document, Types } from 'mongoose';

export type AdviserDocument = Adviser & Document;

@Schema()
export class Adviser {
    @Prop()
    advisercompany: string;
    @Prop()
    @IsEmail()
    adviseremail: string;
    @Prop()
    advisername: string;
    @Prop()
    adviserphone: string;
    @Prop()
    afslname: string;
    @Prop()
    afslnumber: string;
    @Prop()
    assistant: string;
    @Prop()
    authornumber: string;
    @Prop()
    signaturestamp: string;
    @Prop({
        unique: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    userId: Types.ObjectId;

};

export const AdviserSchema = SchemaFactory.createForClass(Adviser);
