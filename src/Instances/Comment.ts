import mongoose from 'mongoose';
import Utils from '../Utils';
import ModelManager from '../Database/ModelManager';
import { ObjectId } from '../Types/ObjectId';

export default class EntityRole {

    public _id: ObjectId = new mongoose.Types.ObjectId();
    public commentId: string = Utils.commentId_prefix + Utils.createId();
    public name: string;
    public body: string;
    public user: ObjectId;

    constructor({ id }: { id: string });
    constructor({ id, name, body, user }:
        { id?: string, name: string, body: string, user: string });
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