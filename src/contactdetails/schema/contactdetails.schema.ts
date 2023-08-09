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
    Title: string;
    @Prop()
    SurName: string;
    @Prop()
    Phone: string;
    @Prop()
    Email: string;
    @Prop()
    PostAddress: string;
    @Prop()
    Suburb: string;
    @Prop()
    State: string;
    @Prop()
    PostCode: string;
    @Prop()
    UserId: string;
}

export const ContactdetailSchema = SchemaFactory.createForClass(Contactdetail);
