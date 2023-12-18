import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BankinfoDocument = Bankinfo & Document;

@Schema()
export class Bankinfo {
    @Prop()
    accountname: string;
    @Prop()
    accountnumber: string;
    @Prop()
    backbranch: string;
    @Prop()
    bsb: string;
    @Prop()
    direct: boolean;
    @Prop()
    institution: string;
    @Prop()
    instruction: string;
    @Prop()
    swiftiban: string;
    @Prop({
        unique: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    userId: Types.ObjectId;
};

export const BankinfoSchema = SchemaFactory.createForClass(Bankinfo);
