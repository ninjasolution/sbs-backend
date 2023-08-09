import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeclarationDocument = Declaration & Document;

@Schema()
export class Declaration {
    @Prop()
    isAllsign: boolean;
    @Prop()
    signature: BinaryType;
    @Prop()
    appName: string;
    @Prop()
    appDate: Date;
    @Prop()
    appTitle: string;
    @Prop()
    appDirector: boolean;
    @Prop()
    appCompanySecretary: boolean;
    @Prop()
    appTrustee: boolean;
    @Prop()
    appOther: boolean;
    @Prop()
    appSpec: string;
    @Prop()
    UserId: string;
};

export const DeclarationSchema = SchemaFactory.createForClass(Declaration);
