import mongoose, { Schema } from "mongoose";

export default class EntitySchema extends Schema {

    public model = "Entity";


    constructor({ id, options, schema =
        {
            entityId: String,
            type: Number,
            details: {
                displayName: String,
                logo: String,
                banner: String,
                description: String,
            },
            personas: {
                supplier: {
                    products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
                }, customer: {
                    requests: [{ type: mongoose.Types.ObjectId, ref: 'Request' }]
                }
            },
            departments: [{ type: mongoose.Types.ObjectId, ref: 'Department' }],
            roles: [{ type: mongoose.Types.ObjectId, ref: 'EntityRole' }],
            categories: [{ type: mongoose.Types.ObjectId, ref: 'EntityCategory' }],
        }
    }: { id?: { enabled: boolean, key: string, value: any }, schema?: any, options?: any }
    ) {
        if (id?.enabled) schema[id.key] = id.value;
        super(schema, options);
    }
}