import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import { Document } from 'mongoose';

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
    @Prop({ required: true, unique: true})
    @IsUUID()
    userId: string;
};

export const BankinfoSchema = SchemaFactory.createForClass(Bankinfo);
