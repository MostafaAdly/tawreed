import mongoose from "mongoose";
import Utils from '../Utils';
import ModelManager from "../Database/ModelManager";
import { ObjectId } from "../Types/ObjectId";

export default class Department {

    public _id: ObjectId = new mongoose.Types.ObjectId();
    public departmentId: string = Utils.departmentId_prefix + Utils.createId();
    public name: string;
    public images: string[];

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