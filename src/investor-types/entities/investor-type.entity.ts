import { Types } from "mongoose";

export class InvestorType {
    id: string;
    description: string;
    label: string;
    value: Array<string>;
    collectionIds: any;
    userId: Types.ObjectId;
}
