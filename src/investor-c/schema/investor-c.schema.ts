import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InvestorCDocument = InvestorC & Document;

@Schema()
export class InvestorC {
    @Prop()
    CompanyfullName: string;
    @Prop()
    license: string;
    @Prop()
    ACN: string;
    @Prop()
    AddressReg: string;
    @Prop()
    Suburb: string;
    @Prop()
    State: string;
    @Prop()
    PostCode: string;
    @Prop()
    AddressPpb: string;
    @Prop()
    SuburbPpb: string;
    @Prop()
    StatePpb: string;
    @Prop()
    PostCodePpb: string;
    @Prop()
    activity: string;
    @Prop()
    listing: string;
    @Prop()
    Proprietary: boolean;
    @Prop()
    Director1Name: string;
    @Prop()
    Director2Name: string;
    @Prop()
    Director3Name: string;
    @Prop()
    Director4Name: string;
    @Prop()
    UserId: string;
};

export const InvestorCSchema = SchemaFactory.createForClass(InvestorC);
