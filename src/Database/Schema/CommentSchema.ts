import mongoose, { Schema } from "mongoose";

export default class EntityRoleSchema extends Schema {

    public model = "Comment";


    constructor({ id, options, schema =
        {
            commentId: String,
            content: String,
            user: { type: mongoose.Types.ObjectId, ref: 'User' },
            product: { type: mongoose.Types.ObjectId, ref: 'Product' },
        }
    }: { id?: { enabled: boolean, key: string, value: any }, schema?: any, options?: any }
    ) {
        if (id?.enabled) schema[id.key] = id.value;
        super(schema, options);
    }
}