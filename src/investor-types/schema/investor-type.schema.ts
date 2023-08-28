import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import mongoose, { Document } from 'mongoose';

export type InvestorTypeDocument = InvestorType & Document;

@Schema()
export class InvestorType {
    @Prop()
    id: string;
    @Prop()
    description: string;
    @Prop()
    label: string;
    @Prop()
    value: Array<string>;
    @Prop({ type: mongoose.Schema.Types.Mixed }) // Set the 'collectionIds' type to Mongoose Mixed
    collectionIds: Record<string, any>; // Update the type of 'collectionIds' to Record<string, any>
  // ... other properties ...
    @Prop({ required: true, unique: true})
    @IsUUID()
    userId: string;
};

export const InvestorTypeSchema = SchemaFactory.createForClass(InvestorType);
