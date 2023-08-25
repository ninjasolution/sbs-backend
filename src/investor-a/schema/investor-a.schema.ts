import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import { Document } from 'mongoose';

export type InvestorADocument = InvestorA & Document;

@Schema()
export class InvestorA {
    @Prop()
    title : string;
    @Prop()
    givenname: string;
    @Prop()
    surname: string;
    @Prop()
    date: Date;
    @Prop()
    email: string;
    @Prop()
    postalAddress: string;
    @Prop()
    suburb: string;
    @Prop()
    state: string;
    @Prop()
    postCode: string;
    @Prop()
    australian: string;
    @Prop()
    country: string;
    @Prop()
    funds: string;
    @Prop()
    exemptioncode: string;
    @Prop()
    licenceno: string;
    @Prop()
    politically: string;
    @Prop({ required: true, unique: true })
    @IsUUID()
    userId: string;
};

export const InvestorASchema = SchemaFactory.createForClass(InvestorA);
