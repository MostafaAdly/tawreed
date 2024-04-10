import mongoose from 'mongoose';
import Utils from '../Utils';
import ModelManager from '../Database/ModelManager';
import { ObjectId } from '../Types/ObjectId';
import { RequestType } from './RequestType';
import { ResponseType } from './ResponseType';

export default class Request {

    public _id: ObjectId = new mongoose.Types.ObjectId();
    public requestId: string = Utils.requestId_prefix + Utils.createId();
    public product: ObjectId;
    public responseType: ResponseType = ResponseType.PENDING;
    public requestType: RequestType = RequestType.PURCHASE;
    public entity: ObjectId;
    public user: ObjectId;

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