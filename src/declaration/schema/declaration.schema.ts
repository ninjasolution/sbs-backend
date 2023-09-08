import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import { Document, Types } from 'mongoose';

export type DeclarationDocument = Declaration & Document;

@Schema()
export class Declaration {
    @Prop()
    date : string;
    @Prop()
    date2 : string;
    @Prop()
    name : string;
    @Prop()
    name2 : string;
    @Prop()
    other : string;
    @Prop()
    other2 : string;
    @Prop()
    owner1Sign: Buffer;
    @Prop()
    owner2Sign: Buffer;
    @Prop()
    title : string;
    @Prop()
    title2 : string;
    @Prop()
    type : string;
    @Prop()
    type2 : string;
    @Prop()
    whosign : string;
    @Prop({
        unique: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    userId: Types.ObjectId;
};

export const DeclarationSchema = SchemaFactory.createForClass(Declaration);
