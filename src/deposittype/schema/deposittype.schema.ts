import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeposittypeDocument = Deposittype & Document;

@Schema()
export class Deposittype {
    @Prop()
    depositName: string;
    @Prop()
    bankinfoId: string;
    @Prop()
    UserId: string;
};

export const DeposittypeSchema = SchemaFactory.createForClass(Deposittype);
