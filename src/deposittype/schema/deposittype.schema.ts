import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DeposittypeDocument = Deposittype & Document;

@Schema()
export class Deposittype {
    @Prop()
    payingby: string;
    @Prop({
        type: Types.ObjectId,
        ref: 'Bankinfo',
    })
    bankinfoId: Types.ObjectId;
    @Prop({
        type: Types.ObjectId,
        ref: 'User',
    })
    userId: Types.ObjectId;
};

export const DeposittypeSchema = SchemaFactory.createForClass(Deposittype);
