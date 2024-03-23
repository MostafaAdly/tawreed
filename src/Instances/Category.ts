import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from 'uuid';

export default class Category {

    private id: String = uuid();
    private name: string;
    private description: string;
    private parent: Category;
    private products: string[] = [];
    private children: Category[] = [];

    constructor(id: string);
    constructor({ id, name, description, parent, products, children }:
        { id: string, name: string, description: string, parent: Category, products: string[], children: Category[] })
    constructor(input: any) {
        if (typeof input === "string")
            this.id = input;
        else {
            this.id = input.id;
            this.name = input.name;
            this.description = input.description;
            this.parent = input.parent;
            this.products = input.products;
            this.children = input.children;
        }
    }

    public load = async () => {
        const category = await Category.schema().findOne({ id: this.id });
        if (!category) return this;
        this.name = category.name;
        this.description = category.description;
        this.parent = category.parent;
        this.products = category.products;
        this.children = category.children;
    }

    private static model: any;
    public static schema = () => {
        if (!this.model) this.model = mongoose.model('categories', new Schema({
            id: { type: String, unique: true },
            name: { type: String },
            description: { type: String },
            parent: { type: Category },
            products: { type: Array<String> },
            children: { type: Array<Category> }
        }));
        return this.model;
    }
    public save = async () => await new (Category.schema())(this).save();
}