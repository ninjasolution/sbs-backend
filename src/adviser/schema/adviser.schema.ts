import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsUUID } from 'class-validator';
import { Document } from 'mongoose';

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
    adviserphone: number;
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
    @Prop({ required: true, unique: true})
    @IsUUID()
    userId: string;

};

export const AdviserSchema = SchemaFactory.createForClass(Adviser);
