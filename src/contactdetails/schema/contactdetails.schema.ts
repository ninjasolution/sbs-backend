import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import {
    Document
} from 'mongoose';
import { IsUUID, isUUID } from 'class-validator';

export type ContactdetailDocument = Contactdetail & Document;

@Schema()
export class Contactdetail {
    @Prop()
    title: string;
    @Prop()
    givenname: string;
    @Prop()
    surname: string;
    @Prop()
    phone: string;
    @Prop()
    email: string;
    @Prop()
    address: string;
    @Prop()
    suburb: string;
    @Prop()
    state: string;
    @Prop()
    postcode: string;
    @Prop({ required: true, unique: true })
    @IsUUID()
    userId: string;
}

export const ContactdetailSchema = SchemaFactory.createForClass(Contactdetail);
