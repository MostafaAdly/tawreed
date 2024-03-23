import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from 'uuid';
import Utils from '../Utils';

export default class Department {

    public id: string = Utils.departmentId_prefix + Utils.createId();
    public name: string;
    public images: string[];

    constructor(name: string, images: string[]) {
        this.name = name;
        this.images = images;
    }

    private static model: any;
    public static schema = () => {
        if (!this.model) this.model = mongoose.model('departments', new Schema({
            id: { type: String, unique: true },
            name: { type: String },
            images: { type: Array<String> }
        }));
        return this.model;
    }
    public async save() {
        return await new (Department.schema())(this).save();
    }
}