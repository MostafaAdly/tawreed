import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from 'uuid';

export default class User {

    public id: string = uuid();
    public name: string;
    public credentials: { email: string, password: string };
    public createdAt: Date;

    constructor(user: { id?: string, name: string, credentials: { email: string, password: string }, createdAt?: Date }) {
        if (user.id)
            this.id = user.id;
        this.name = user.name;
        this.credentials = user.credentials;
        this.createdAt = user.createdAt || new Date();
    }

    private static model: any;
    public static schema = () => {
        if (!this.model) this.model = mongoose.model('users', new Schema({
            id: { type: String, unique: true },
            name: String,
            credentials: { type: Object },
            createdAt: Date
        }));
        return this.model;
    }

    public async save() {
        return await new (User.schema())(this).save();
    }
}