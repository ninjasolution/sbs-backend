import { Document } from 'mongoose';

export interface Token extends Document {
    userId: string;
    token: string,
    type: string,
    status: boolean
}
