import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import { Document } from 'mongoose';

export type DeposittypeDocument = Deposittype & Document;

@Schema()
export class Deposittype {
    @Prop()
    payingby: string;
    @Prop()
    bankinfoId: string;
    @Prop({ required: true, unique: true})
    @IsUUID()
    userId: string;
};

export const DeposittypeSchema = SchemaFactory.createForClass(Deposittype);
