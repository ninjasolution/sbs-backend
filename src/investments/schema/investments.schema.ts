import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import {
    Document, Types
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
    @Prop({
        unique: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    userId: Types.ObjectId;
}

export const InvestmentSchema = SchemaFactory.createForClass(Investment);
