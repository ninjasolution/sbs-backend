import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import mongoose, { Document, Types } from 'mongoose';

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
    @Prop({
        unique: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    userId: Types.ObjectId;
};

export const InvestorASchema = SchemaFactory.createForClass(InvestorA);
