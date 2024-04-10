import mongoose, { Schema } from "mongoose";

export default class EntityCategorySchema extends Schema {

    public model = "EntityCategory";


    constructor({ id, options, schema =
        {
            categoryId: String,
            name: String,
            description: String,
            entity: { type: mongoose.Types.ObjectId, ref: 'Entity' },
            ancestry: String,
            products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }]
        }
    }: { id?: { enabled: boolean, key: string, value: any }, schema?: any, options?: any }
    ) {
        if (id?.enabled) schema[id.key] = id.value;
        super(schema, options);
    }
}