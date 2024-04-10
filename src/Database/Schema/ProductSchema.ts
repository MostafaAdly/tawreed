import mongoose, { Schema } from "mongoose";

export default class ProductSchema extends Schema {

    public model = "Product";


    constructor({ id, options, schema =
        {
            productId: String,
            name: String,
            description: String,
            details: Object,
            price: {
                cost: Number,
                quantity: Number,
                unit: String,
                currency: String
            },
            images: [String],
        }
    }: { id?: { enabled: boolean, key: string, value: any }, schema?: any, options?: any }
    ) {
        if (id?.enabled) schema[id.key] = id.value;
        super(schema, options);
    }
}