import { ObjectId } from "../Types/ObjectId";
import { PaymentMethod } from "./enums/PaymentMethod";
export default class Payment {
    _id: ObjectId;
    paymentId: string;
    commission: number;
    request: ObjectId;
    customer: ObjectId;
    supplier: ObjectId;
    method: PaymentMethod.CASH;
    constructor(input?: any);
    load: (query: any) => Promise<this | undefined>;
    save: () => Promise<void>;
}
