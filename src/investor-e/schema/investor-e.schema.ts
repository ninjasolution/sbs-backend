import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import { Document } from 'mongoose';

export type InvestorEDocument = InvestorE & Document;

@Schema()
export class InvestorE {
    @Prop()
    eowner1isexposedperson: string;
    @Prop()
    eowner1postCode: string;
    @Prop()
    eowner1state: string;
    @Prop()
    eowner1suburb: string;
    @Prop()
    eowner2isexposedperson: string;
    @Prop()
    eowner2state: string;
    @Prop()
    eowner2suburb: string;
    @Prop()
    eowner3isexposedperson: string;
    @Prop()
    eowner3postCode: string;
    @Prop()
    eowner3state: string;
    @Prop()
    eowner3suburb: string;
    @Prop()
    eownerdate1: string;
    @Prop()
    eownerdate2: string;
    @Prop()
    eownerdate3: string;
    @Prop()
    eownername1: string;
    @Prop()
    eownername2: string;
    @Prop()
    eownername3: string;
    @Prop()
    eownerresidental1: string;
    @Prop()
    eownerresidental2: string;
    @Prop()
    eownerresidental3: string;
    @Prop({ required: true, unique: true })
    @IsUUID()
    userId: string;
};

export const InvestorESchema = SchemaFactory.createForClass(InvestorE);
