import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from 'uuid';
import Company from "./Company";

export default class Product {

    public id: string = uuid();
    public name: string;
    public companyId: string;
    public department: string;
    public createdAt: Date;

    constructor(product: any) {
        if (product.id)
            this.id = product.id;
        this.name = product.name;
        this.companyId = product.companyId;
        this.department = product.department;
        this.createdAt = product.createdAt || new Date();
    }

    private model: any;
    schema = () => {
        if (!this.model) this.model = mongoose.model('products', new Schema({
            id: { type: String, unique: true },
            name: String,
            companyId: String,
            department: String,
            createdAt: Date
        }));
        return this.model;
    }
}