import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from 'uuid';
import Product from './Product';
export default class Company {

    public id: string = uuid();
    public name: string;
    public field: string;
    public description: string;
    public products: string[];
    public departments: string[];
    public addedAt: Date;

    constructor(company: any) {
        this.id = company.id || uuid();
        this.name = company.name;
        this.field = company.field;
        this.description = company.description;
        this.products = company.products;
        this.departments = company.departments;
        this.addedAt = company.addedAt || new Date();
    }

    private model: any;
    schema = () => {
        if (!this.model) this.model = mongoose.model('companies', new Schema({
            id: { type: String, unique: true },
            name: String,
            field: String,
            description: String,
            products: Array,
            departments: Array,
            addedAt: Date
        }));
        return this.model;
    }
}