import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import {
    Document
} from 'mongoose';

export type InvestmentDocument = Investment & Document;

@Schema()
export class Investment {
    @Prop()
    amount: string;
    @Prop()
    fundSelected: string;
    @Prop()
    UserId: string;
}

export const InvestmentSchema = SchemaFactory.createForClass(Investment);
