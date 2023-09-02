import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import { Document, Types } from 'mongoose';

export type DeposittypeDocument = Deposittype & Document;

@Schema()
export class Deposittype {
    @Prop()
    payingby: string;
    @Prop({
        unique: true,
        type: Types.ObjectId,
        ref: 'Bankinfo',
    })
    bankinfoId: Types.ObjectId;
    @Prop({
        unique: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    userId: Types.ObjectId;
};

export const DeposittypeSchema = SchemaFactory.createForClass(Deposittype);
