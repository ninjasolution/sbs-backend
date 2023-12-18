import {
    Prop,
    Schema,
    SchemaFactory,
} from '@nestjs/mongoose';
import {
    Document,
    Types
} from 'mongoose';
import crypto from "crypto"

export type TokenDocument = Token & Document;

@Schema()
export class Token {
    @Prop({
        type: Types.ObjectId,
        ref: 'User',
    })
    userId: Types.ObjectId;

    @Prop()
    token: string;

    @Prop()
    type: string;

    @Prop()
    status: boolean;
}

export const TokenSchema = SchemaFactory.createForClass(Token);


TokenSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('token')) {
            return next();
        }

        const hashed = crypto.randomBytes(32).toString("hex")
        this['token'] = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});
