import { Types } from "mongoose";
export class Deposittype {
    payingby: string;
    bankinfoId: Types.ObjectId;
    userId: Types.ObjectId;
};
