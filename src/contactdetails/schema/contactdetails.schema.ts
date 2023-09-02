import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import {
    Document, Types
} from 'mongoose';

import { v4 as UUID } from 'uuid';

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
    @Prop({
        unique: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    userId: Types.ObjectId;
}

export const ContactdetailSchema = SchemaFactory.createForClass(Contactdetail);
