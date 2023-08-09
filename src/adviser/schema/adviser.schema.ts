import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdviserDocument = Adviser & Document;

@Schema()
export class Adviser {
    @Prop()
    adviserName: string;
    @Prop()
    advisercompany: string;
    @Prop()
    assistantName: string;
    @Prop()
    adviserEmail: string;
    @Prop()
    adviserPhone: string;
    @Prop()
    AFSLName: string;
    @Prop()
    AFSLNumber: string;
    @Prop()
    authNumber: string;
    @Prop()
    adviserSAS: string;
    @Prop()
    UserId: string;
};

export const AdviserSchema = SchemaFactory.createForClass(Adviser);
