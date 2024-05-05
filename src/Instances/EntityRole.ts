import mongoose from 'mongoose';
import Utils from '../Utils';
import { Permission } from './enums/Permission';
import ModelManager from '../Database/ModelManager';
import { ObjectId } from '../Types/ObjectId';

export default class EntityRole {

    public _id: ObjectId = new mongoose.Types.ObjectId();
    public roleId: string = Utils.roleId_prefix + Utils.createId();
    public name: string;
    public permissions: Permission[];
    public priority: number = 100;

    constructor({ id }: { id: string });
    constructor({ id, name, permissions, priority }: { id?: string, name: string, permissions: Permission[], priority: number });
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