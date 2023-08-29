import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import { Document } from 'mongoose';

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
    type : Array<string>;
    @Prop()
    type2 : Array<string>;
    @Prop()
    whosign : string;
    @Prop({ required: true, unique: true})
    @IsUUID()
    userId: string;
};

export const DeclarationSchema = SchemaFactory.createForClass(Declaration);
