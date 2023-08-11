import { Document } from 'mongoose';

export interface User extends Document {
    name: string;
    displayName: string;
    gender: string;
    phone: string;
    lastName: string;
    email: string;
    image: string;
    imageKey:string;
    retailerId:string;
    password: string;
    roles: [string];
    verification: string;
    verified: boolean;
    verificationExpires: Date;
    loginAttempts?: number;
    blockExpires?: Date;
    client?: string;
}