import { Types } from "mongoose";

export class Contactdetail {
    title: string;
    givenname: string;
    surname: string;
    phone: string;
    email: string;
    address: string;
    suburb: string;
    state: string;
    postcode: string;
    userId: Types.ObjectId;
};

