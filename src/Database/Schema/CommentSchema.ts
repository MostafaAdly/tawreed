import mongoose, { Schema } from "mongoose";

export default class EntityRoleSchema extends Schema {

    public model = "Comment";


    constructor({ id, options, schema =
        {
            commentId: String,
            name: String,
            body: String,
            user: { type: mongoose.Types.ObjectId, ref: 'User' }
        }
    }: { id?: { enabled: boolean, key: string, value: any }, schema?: any, options?: any }
    ) {
        if (id?.enabled) schema[id.key] = id.value;
        super(schema, options);
    }
}