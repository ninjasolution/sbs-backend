import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BankinfoDocument = Bankinfo & Document;

@Schema()
export class Bankinfo {
    @Prop()
    bankName: string;
    @Prop()
    accountName: string;
    @Prop()
    BSB: string;
    @Prop()
    accountNumber: string;
    @Prop()
    distributionInst: string;
    @Prop()
    iban: string;
    @Prop()
    bankbranch: string;
    @Prop()
    UserId: string;
};

export const BankinfoSchema = SchemaFactory.createForClass(Bankinfo);
