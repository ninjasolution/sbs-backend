import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InvestorDDocument = InvestorD & Document;

@Schema()
export class InvestorD {
    @Prop()
    TrusteeName: string;
    @Prop()
    TrusteeAddress: string;
    @Prop()
    Suburb: string;
    @Prop()
    State: string;
    @Prop()
    PostCode: string;
    @Prop()
    isAdditionalTrustee: boolean;
    @Prop()
    TrustName: string;
    @Prop()
    TFNcode: string;
    @Prop()
    TrustType: string;
    @Prop()
    TrustCountry: string;
    @Prop()
    TrustActivity: string;
    @Prop()
    isTrustIdterms: boolean;
    @Prop()
    beneficiary1: string;
    @Prop()
    beneficiary2: string;
    @Prop()
    beneficiary3: string;
    @Prop()
    isAdditionalBeneficiary: boolean;
    @Prop()
    TrustFOS: string;
    @Prop()
    UserId: string;
};

export const InvestorDSchema = SchemaFactory.createForClass(InvestorD);
