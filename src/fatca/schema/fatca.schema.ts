import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InvestorBDocument = InvestorB & Document;

@Schema()
export class InvestorB {
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
    TFNcode: string;
    @Prop()
    license: string;
    @Prop()
    political: boolean;
    @Prop()
    UserId: string;
};

export const InvestorBSchema = SchemaFactory.createForClass(InvestorB);
