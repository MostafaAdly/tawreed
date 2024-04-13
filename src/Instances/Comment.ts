import mongoose from 'mongoose';
import Utils from '../Utils';
import ModelManager from '../Database/ModelManager';
import { ObjectId } from '../Types/ObjectId';

export default class Comment {

    public _id: ObjectId = new mongoose.Types.ObjectId();
    public commentId: string = Utils.commentId_prefix + Utils.createId();
    public content: string;
    public user: ObjectId;
    public product: ObjectId;

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