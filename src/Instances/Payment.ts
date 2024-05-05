import ModelManager from "../Database/ModelManager";
import { ObjectId } from "../Types/ObjectId";
import Utils from '../Utils'
import { PaymentMethod } from "./enums/PaymentMethod";

export default class Payment {
    public _id: ObjectId;
    public paymentId: string = Utils.paymentId_prefix + Utils.createId();
    public commission: number = 0;
    public request: ObjectId;
    public customer: ObjectId;
    public supplier: ObjectId;
    public method: PaymentMethod.CASH;

    constructor(input?: any) {
        if (input) Object.assign(this, input);
    }

    public load = async (query: any) => {
        const doc = await ModelManager.loadOne(this.constructor.name, query);
        if (!doc) return;
        Object.assign(this, doc);
        return this;
    };

    public save = async () => await ModelManager.save(this.constructor.name, this);
}