import { Types } from "mongoose";

export class Investment {
    amount: number;
    fund: string;
    distribution: string;
    percent: number;
    userId: Types.ObjectId;
}
