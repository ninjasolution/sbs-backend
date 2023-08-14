import { UUID } from "crypto";

export class User {
    firstname: string;
    surname: string;
    gender: string;
    email: string;
    password: string;
    roles: [string];
    verification: UUID;
    verified: boolean;
    verificationExpires: Date;
    loginAttempts: Number;
    blockExpires: Date;
  }
  