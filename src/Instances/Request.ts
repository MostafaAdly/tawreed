import mongoose from 'mongoose';
import Utils from '../Utils';
import ModelManager from '../Database/ModelManager';
import { ObjectId } from '../Types/ObjectId';
import { RequestType } from './enums/RequestType';
import { ResponseType } from './enums/ResponseType';
import RFQSettings from './RFQSettings';

export default class Request {

    public _id: ObjectId = new mongoose.Types.ObjectId();
    public requestId: string = Utils.requestId_prefix + Utils.createId();
    public product: ObjectId;
    public responseType: ResponseType = ResponseType.PURCHASE_PENDING;
    public requestType: RequestType = RequestType.PURCHASE;
    public payment: ObjectId;
    public rfqSettings: RFQSettings;
    public supplier: ObjectId;
    public customer: ObjectId;
    public user: ObjectId;
    public instant: boolean = false;

    constructor(input?: any) {
        if (input) Object.assign(this, input);
    }

    public processPurchase = async (requestType: RequestType, productId: ObjectId, supplierId: ObjectId, customerId: ObjectId, userId: ObjectId) => {
        this.product = productId;
        this.supplier = supplierId;
        this.customer = customerId;
        this.user = userId;
        this.requestType = requestType;
        await this.save();
        return this;
    }

    public setRfqSettings = (rfqSettings: RFQSettings): Request => {
        this.rfqSettings = rfqSettings;
        if (JSON.stringify(rfqSettings) != "{}") this.responseType = ResponseType.RFQ_PENDING;
        return this;
    }

    public load = async (query: any) => {
        const doc = await ModelManager.loadOne(this.constructor.name, query);
        if (!doc) return;
        Object.assign(this, doc);
        return this;
    };

    public save = async () => await ModelManager.save(this.constructor.name, this);

}