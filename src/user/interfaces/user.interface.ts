import { Document } from 'mongoose';

export interface User extends Document {
    firstname: string;
    surname: string;
    displayname: string;
    gender: string;
    email: string;
    password: string;
    roles: [string];
    verification: string;
    verified: boolean;
    verificationExpires: Date;
    loginAttempts?: number;
    blockExpires?: Date;
}
