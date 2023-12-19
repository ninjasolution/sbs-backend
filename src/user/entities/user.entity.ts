import { Document } from 'mongoose';

export interface User extends Document {
    firstname: string;
    surname: string;
    displayname: string;
    gender: string;
    email: string;
    password: string;
    roles: [string];
    phone: string;
    postal: string;
    step: number;
    rtime: number;
    verification: string;
    verified: boolean;
    verificationExpires: Date;
    loginAttempts?: number;
    blockExpires?: Date;
}
