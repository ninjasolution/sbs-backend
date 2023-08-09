import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InvestorEDocument = InvestorE & Document;

@Schema()
export class InvestorE {
    @Prop()
    OwnerName: string;
    @Prop()
    Ownerbirth: Date;
    @Prop()
    OwnerAddress: string;
    @Prop()
    OwnerSuburb: string;
    @Prop()
    OwnerState: string;
    @Prop()
    OwnerPostCode: string;
    @Prop()
    isOwnerPolitical: boolean;
    @Prop()
    Owner2Name: string;
    @Prop()
    Owner2birth: Date;
    @Prop()
    Owner2Address: string;
    @Prop()
    Owner2Suburb: string;
    @Prop()
    Owner2State: string;
    @Prop()
    Owner2PostCode: string;
    @Prop()
    isOwner2Political: boolean;
    @Prop()
    Owner3Name: string;
    @Prop()
    Owner3birth: Date;
    @Prop()
    Owner3Address: string;
    @Prop()
    Owner3Suburb: string;
    @Prop()
    Owner3State: string;
    @Prop()
    Owner3PostCode: string;
    @Prop()
    isOwner3Political: boolean;
    @Prop()
    UserId: string;
};

export const InvestorESchema = SchemaFactory.createForClass(InvestorE);
