import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InvestorTypeDocument = InvestorType & Document;

@Schema()
export class InvestorType {
    @Prop()
    Title: string;
    @Prop()
    Content: string;
    @Prop()
    tableNames: Array<string>;
    @Prop()
    tableIds: Array<string>;
    @Prop()
    UserId: string;
};

export const InvestorTypeSchema = SchemaFactory.createForClass(InvestorType);
