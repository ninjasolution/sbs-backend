import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import mongoose, { Document, Types } from 'mongoose';


export type InvestorBDocument = InvestorB & Document;

@Schema()
export class InvestorB {
    @Prop()
    baustralian : string;
    @Prop()
    bcountry : string;
    @Prop()
    bdate : Date;
    @Prop()
    bemail : string;
    @Prop()
    bexemptioncode : string;
    @Prop()
    bfunds : string;
    @Prop()
    bgivenname : string;
    @Prop()
    blicenceno : string;
    @Prop()
    bpolitically : string;
    @Prop()
    bpostCode : string;
    @Prop()
    bresidentialaddress : string;
    @Prop()
    bstate : string;
    @Prop()
    bsuburb : string;
    @Prop()
    bsurname : string;
    @Prop()
    bticka :  boolean;
    @Prop()
    btitle : string;
    @Prop({
        unique: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    userId: Types.ObjectId;
};

export const InvestorBSchema = SchemaFactory.createForClass(InvestorB);
