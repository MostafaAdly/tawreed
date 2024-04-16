import mongoose, { Schema } from "mongoose";

export default class EntityRoleSchema extends Schema {

    public model = "EntityRole";


    constructor({ id, options, schema =
        {
            roleId: String,
            name: String,
            permissions: [String],
            priority: Number
        }
    }: { id?: { enabled: boolean, key: string, value: any }, schema?: any, options?: any }
    ) {
        if (id?.enabled) schema[id.key] = id.value;
        super(schema, options);
    }
}