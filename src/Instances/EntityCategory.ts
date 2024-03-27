import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from 'uuid';
import { faker } from "@faker-js/faker/locale/ar";
import Product from "./Product";
import Entity from "./Entity";
import Utils from '../Utils';

export default class EntityCategory {

    public id: string = Utils.entityCategoryId_prefix + Utils.createId();
    public name: string;
    public description: string;
    public entity: string;
    public products: string[] = [];
    private ancestry: string = "";

    constructor(id: string);
    constructor({ name, description
        , entity, ancestry }:
        {
            name: string,
            description: string,
            entity: string,
            ancestry?: string,
        });
    constructor(input: any) {
        if (typeof input === "string")
            this.id = input;
        else {
            this.name = input.name;
            this.description = input.description;
            this.entity = input.entity;
            this.ancestry = input.ancestry || this.ancestry;
        }
    }

    public load = async () => {
        const category = await EntityCategory.schema().findOne({ id: this.id });
        if (!category) return this;
        this.name = category.name;
        this.description = category.description;
        this.entity = category.entity;
        this.ancestry = category.ancestry;
        this.products = category.products;
    }

    public setId(id: string): EntityCategory {
        this.id = id;
        return this;
    }

    public setProducts(products: string[]): EntityCategory {
        this.products = products;
        return this;
    }

    public async createFakerChildren(products: Product[], entity: Entity, amount: number) {
        if (amount == 0) {
            // create products
            var asd = Math.floor(Math.random() * entity.personas.supplier.products.length);
            console.log(`adding ${asd} products to ${this.id}`)
            for (let i = 0; i < asd; i++)
                this.products.push(this.random(products).id);
        } else {
            for (let i = 0; i < Math.floor(Math.random() * 4) + 1; i++) {
                const category = new EntityCategory({
                    name: `Group ${faker.word.sample()}`,
                    description: faker.company.catchPhrase(),
                    entity: entity.id,
                    ancestry: this.ancestry + "/" + this.id
                });
                category.createFakerChildren(products, entity, amount - 1);
                // this.children.push(category);
            }
        }
        await this.save();
    }
    private random = (list: any[]) => list[Math.floor(Math.random() * list.length)];

    private static model: any;
    public static schema = () => {
        if (!this.model) this.model = mongoose.model('categories', new Schema({
            id: { type: String, unique: true },
            name: { type: String },
            description: { type: String },
            entity: { type: String },
            // children: { type: Array<Object> },
            ancestry: { type: String },
            products: { type: Array<String> }
        }));
        return this.model;
    }
    public save = async () => await new (EntityCategory.schema())(this).save();
}