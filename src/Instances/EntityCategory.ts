import mongoose from "mongoose";
import { faker } from "@faker-js/faker/locale/ar";
import Product from "./Product";
import Entity from "./Entity";
import Utils from '../Utils';
import ModelManager from "../Database/ModelManager";
import { ObjectId } from "../Types/ObjectId";

export default class EntityCategory {

    public _id: ObjectId = new mongoose.Types.ObjectId();
    public categoryId: string = Utils.entityCategoryId_prefix + Utils.createId();
    public name: string;
    public description: string;
    public entity: ObjectId;
    public products: ObjectId[] = [];
    private ancestry: string = "";

    constructor(_id: ObjectId);
    constructor({ name, description
        , entity, ancestry }:
        {
            name: string,
            description: string,
            entity: ObjectId,
            ancestry?: string,
        });
    constructor(input?: any) {
        if (input) Object.assign(this, input);
    }

    public setId(id: ObjectId): EntityCategory {
        this._id = id;
        return this;
    }

    public setProducts(products: ObjectId[]): EntityCategory {
        this.products = products;
        return this;
    }

    public async createFakerChildren(products: Product[], entity: Entity, amount: number) {
        if (amount == 0) {
            // create products
            var asd = Math.floor(Math.random() * (entity.personas.supplier?.products.length || 0));
            console.log(`adding ${asd} products to ${this._id}`)
            for (let i = 0; i < asd; i++)
                this.products.push(this.random(products)._id);
        } else {
            for (let i = 0; i < Math.floor(Math.random() * 4) + 1; i++) {
                const category = new EntityCategory({
                    name: `Group ${faker.word.sample()}`,
                    description: faker.company.catchPhrase(),
                    entity: entity._id,
                    ancestry: this.ancestry + "/" + this.categoryId
                });
                category.createFakerChildren(products, entity, amount - 1);
                // this.children.push(category);
            }
        }
        await this.save();
    }
    private random = (list: any[]) => list[Math.floor(Math.random() * list.length)];

    public load = async (query: any) => {
        const doc = await ModelManager.loadOne(this.constructor.name, query);
        if (!doc) return;
        Object.assign(this, doc);
        return this;
    };

    public save = async () => await ModelManager.save(this.constructor.name, this);
}