import mongoose from "mongoose";
import Utils from "../Utils";
import Price from "./Price";
import ModelManager from "../Database/ModelManager";
import { ObjectId } from "../Types/ObjectId";

export default class Product {

    public _id: ObjectId = new mongoose.Types.ObjectId();
    public productId: string = Utils.productId_prefix + Utils.createId();
    public name: string;
    public description: string;
    public details: any = {};
    public images: string[] = [];
    public price: Price = new Price({ cost: 0, quantity: 1, unit: "قطعة" });

    constructor();
    constructor({ id }: { id: string });
    constructor(
        {
            name,
            description,
            details,
            price,
            images
        }: any);
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