import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import mongoose, { Document, Types } from 'mongoose';

export type WordGenDocument = WordGen & Document;

@Schema()
export class WordGen {
    @Prop()
    orientation: string;
    @Prop()
    docxpath: string;
    @Prop({
        unique: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    userId: Types.ObjectId;
};

export const WordGenSchema = SchemaFactory.createForClass(WordGen);
