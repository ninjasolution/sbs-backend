import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import { Document } from 'mongoose';

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
    @Prop({ required: true, unique: true})
    @IsUUID()
    userId: string;
};

export const FatcaSchema = SchemaFactory.createForClass(Fatca);
