import { Types } from "mongoose";

export class Adviser {
    advisercompany: string;
    adviseremail: string;
    advisername: string;
    adviserphone: string;
    afslname: string;
    afslnumber: string;
    assistant: string;
    authornumber: string;
    signaturestamp: string;
    userId: Types.ObjectId;
}
