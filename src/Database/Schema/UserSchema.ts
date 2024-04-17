import mongoose, { Schema } from "mongoose";

export default class UserSchema extends Schema {

    public model = "User";


    constructor({ id, options, schema =
        {
            userId: String,
            displayName: { type: String, required: true },
            credentials: {
                username: { type: String, required: true },
                password: { type: String, required: true }
            },
            entity: { type: mongoose.Types.ObjectId, required: true, ref: 'Entity' },
            role: { type: mongoose.Types.ObjectId, required: true, ref: 'EntityRole' },
            admin: Boolean
        }
    }: { id?: { enabled: boolean, key: string, value: any }, schema?: any, options?: any }
    ) {
        if (id?.enabled) schema[id.key] = id.value;
        super(schema, options);
    }
}