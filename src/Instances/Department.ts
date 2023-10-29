import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from 'uuid';

export default class Department {

    public id: string = uuid();
    public name: string;
    public imageURL: string;
    public createdAt: Date;

    constructor(department: any) {
        this.id = department.id || uuid();
        this.name = department.name;
        this.imageURL = department.imageURL;
        this.createdAt = department.createdAt || new Date();
    }

    private static model: any;
    public static schema = () => {
        if (!this.model) this.model = mongoose.model('departments', new Schema({
            id: { type: String, unique: true },
            name: String,
            imageURL: String,
            createdAt: Date
        }));
        return this.model;
    }
    public async save() {
        return await new (Department.schema())(this).save();
    }
}