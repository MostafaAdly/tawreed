import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from 'uuid';
import Utils from "../Utils";
import Price from "./Price";

export default class Product {

    public id: string = Utils.productId_prefix + Utils.createId();
    public name: string;
    public description: string;
    public details: any = {};
    public images: string[] = [];
    public price: Price;

    constructor({ id }: { id: string });
    constructor({ name, description, details, price, images }: {
        name: string, description: string, details: any, price: Price, images: string[]
    });
    constructor(input: any) {
        this.id = input.id || this.id;
        this.name = input.name;
        this.description = input.description;
        this.details = input.details;
        this.price = input.price || new Price({ cost: 0, quantity: 1, unit: "قطعة" });
        this.images = input.images || [];
    }

    public async load() {
        if (!this.id) return;
        const product = await Product.schema().find({ id: this.id });
        if (!product) return;
        this.name = product.description;
        this.description = product.description;
        this.details = product.details;
        console.log(`Loaded Product: ${product.id}}`, product);
    }

    private static model: any;
    public static schema = () => {
        if (!this.model) this.model = mongoose.model('products', new Schema({
            id: { type: String, unique: true },
            name: String,
            description: String,
            details: Object,
            price: Object,
            images: Array<string>,
        }));
        return this.model;
    }
    public save = async () => await new (Product.schema())(this).save();
}