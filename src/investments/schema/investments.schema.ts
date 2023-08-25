import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import {
    Document
} from 'mongoose';

export type InvestmentDocument = Investment & Document;

@Schema()
export class Investment {
    @Prop()
    amount: number;
    @Prop()
    fund: string;
    @Prop()
    distribution: string;
    @Prop()
    percent: number;
    @Prop({required: true, unique: true})
    @IsUUID()
    userId: string;
}

export const InvestmentSchema = SchemaFactory.createForClass(Investment);
