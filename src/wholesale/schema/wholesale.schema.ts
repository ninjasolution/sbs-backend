import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import mongoose, { Document } from 'mongoose';

export type WholesaleDocument = Wholesale & Document;

@Schema()
export class Wholesale {
    @Prop({ type: mongoose.Schema.Types.Mixed }) // Set the 'status' type to Mongoose Mixed
    status: Record<string, string>; // Update the type of 'status' to Record<string, string>
    @Prop({ required: true, unique: true})
    @IsUUID()
    userId: string;
};

export const WholesaleSchema = SchemaFactory.createForClass(Wholesale);
