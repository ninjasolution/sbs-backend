import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import { Document, Types } from 'mongoose';

export type FatcaDocument = Fatca & Document;

@Schema()
export class Fatca {
    @Prop()
    isUscitizen: string;
    @Prop()
    email: string;
    @Prop()
    finalcial : string;
    @Prop()
    firstperson: string;
    @Prop()
    fullname: string;
    @Prop()
    idnumber : string;
    @Prop()
    istrust : string;
    @Prop()
    postCode: string;
    @Prop()
    residentialaddress: string;
    @Prop()
    secondperson: string;
    @Prop()
    state: string;
    @Prop()
    suburb: string;
    @Prop()
    surname: string;
    @Prop()
    ustin: string;
    @Prop({
        unique: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    userId: Types.ObjectId;
};

export const FatcaSchema = SchemaFactory.createForClass(Fatca);
