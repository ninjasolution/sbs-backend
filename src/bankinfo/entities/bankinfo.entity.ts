import { Types } from "mongoose";

export class Bankinfo {
    accountname: string;
    accountnumber: string;
    backbranch: string;
    bsb: string;
    direct: boolean;
    institution: string;
    instruction: string;
    swiftiban: string;
    userId: Types.ObjectId;
}
