import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InvestorADocument = InvestorA & Document;

@Schema()
export class InvestorA {
    @Prop()
    Title: string;
    @Prop()
    GivenName: string;
    @Prop()
    SurName: string;
    @Prop()
    birth: Date;
    @Prop()
    Email: string;
    @Prop()
    Address: string;
    @Prop()
    Suburb: string;
    @Prop()
    State: string;
    @Prop()
    PostCode: string;
    @Prop()
    country: string;
    @Prop()
    sourcefunds: string;
    @Prop()
    TFNcode: string;
    @Prop()
    license: string;
    @Prop()
    political: boolean;
    @Prop()
    UserId: string;
};

export const InvestorASchema = SchemaFactory.createForClass(InvestorA);
