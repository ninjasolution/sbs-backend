import { Types } from "mongoose";
export class Declaration {
    date : string;
    date2 : string;
    name : string;
    name2 : string;
    other : string;
    other2 : string;
    owner1Sign : string;
    owner2Sign : string;
    title : string;
    title2 : string;
    type : string;
    type2 : string;
    whosign : string;
    userId: Types.ObjectId;
}
