import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FatcaDocument = Fatca & Document;

@Schema()
export class Fatca {
    @Prop()
    isUscitizen: boolean;
    @Prop()
    usTIN: string;
    @Prop()
    usTIN2: string;
    @Prop()
    isTrustUS: boolean;
    @Prop()
    isTrustInst: boolean;
    @Prop()
    GIIN: string;
    @Prop()
    GivenName: string;
    @Prop()
    SurName: string;
    @Prop()
    USTIN: string;
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
    UserId: string;
};

export const FatcaSchema = SchemaFactory.createForClass(Fatca);
