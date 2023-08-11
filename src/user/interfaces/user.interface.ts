import { Document } from 'mongoose';

export interface User extends Document {
    FirstName: string;
    SurName: string;
    displayName: string;
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
