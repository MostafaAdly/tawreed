import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from 'uuid';
import ImageURL from './ImageURL';

export default class User {

    public id: string = uuid();
    public arabicName: string;
    public englishName: string;
    public imageURL: string;
    public credentials: { email: string, password: string };
    public createdAt: Date;

    constructor(user: any) {
        this.id = user.id || uuid();
        this.arabicName = user.arabicName;
        this.englishName = user.englishName;
        this.credentials = { email: user.email, password: user.password };
        this.createdAt = user.createdAt || new Date();
        //===

        if (this.credentials)
            this.credentials.email = this.credentials?.email?.toLowerCase();

        //===
        this.imageURL = new ImageURL(user.imageURL).getURL();
    }

    private static model: any;
    public static schema = () => {
        if (!this.model) this.model = mongoose.model('users', new Schema({
            id: { type: String, unique: true },
            arabicName: String,
            englishName: String,
            imageURL: String,
            credentials: Object,
            createdAt: Date
        }));
        return this.model;
    }

    public async save() {
        return await new (User.schema())(this).save();
    }
}