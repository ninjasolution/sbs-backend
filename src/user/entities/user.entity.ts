export class User {
    firstname: string;
    surname: string;
    displayname: string;
    gender: string;
    email: string;
    password: string;
    phone: string;
    step: number;
    rtime: number;
    roles: [string];
    verification: string;
    verified: boolean;
    verificationExpires: Date;
    loginAttempts: Number;
    blockExpires: Date;
  }
  