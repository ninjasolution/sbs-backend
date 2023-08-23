import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import {
    Document
} from 'mongoose';

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
    postaddress: string;
    @Prop()
    suburb: string;
    @Prop()
    state: string;
    @Prop()
    postcode: string;
    @Prop()
    UserId: string;
}

export const ContactdetailSchema = SchemaFactory.createForClass(Contactdetail);
