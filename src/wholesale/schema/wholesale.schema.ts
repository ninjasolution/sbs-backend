import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import mongoose, { Document, Types } from 'mongoose';

export type WholesaleDocument = Wholesale & Document;

@Schema()
export class Wholesale {
    @Prop({ type: mongoose.Schema.Types.Mixed }) // Set the 'status' type to Mongoose Mixed
    status: Record<string, string>; // Update the type of 'status' to Record<string, string>
    @Prop({
        unique: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    userId: Types.ObjectId;
};

export const WholesaleSchema = SchemaFactory.createForClass(Wholesale);
