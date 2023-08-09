import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WholesaleDocument = Wholesale & Document;

@Schema()
export class Wholesale {
    @Prop()
    isAmount5105: boolean;
    @Prop()
    isProInvestor: boolean;
    @Prop()
    isAmount25105: boolean;
    @Prop()
    isAmount25104: boolean;
    @Prop()
    isSophInvestor: boolean;
    @Prop()
    UserId: string;
};

export const WholesaleSchema = SchemaFactory.createForClass(Wholesale);
