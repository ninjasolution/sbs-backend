import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import mongoose, { Document, Types } from 'mongoose';


export type InvestorCDocument = InvestorC & Document;

@Schema()
export class InvestorC {
    @Prop()
    cacn: string;
    @Prop()
    cbusinessactivity: string;
    @Prop()
    cbusinessaddress: string;
    @Prop()
    cbusinessdetail: string;
    @Prop()
    cbusinesspostCode: string;
    @Prop()
    cbusinessstate: string;
    @Prop()
    cbusinesssuburb: string;
    @Prop()
    cdirector1: string;
    @Prop()
    cdirector2: string;
    @Prop()
    cdirector3: string;
    @Prop()
    cdirector4: string;
    @Prop()
    clicenceno: string;
    @Prop()
    cname: string;
    @Prop()
    cofficeaddr: string;
    @Prop()
    cofficepostCode: string;
    @Prop()
    cofficestate: string;
    @Prop()
    cofficesuburb: string;
    @Prop()
    compaytype: string;
    @Prop({
        unique: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    userId: Types.ObjectId;
};

export const InvestorCSchema = SchemaFactory.createForClass(InvestorC);
