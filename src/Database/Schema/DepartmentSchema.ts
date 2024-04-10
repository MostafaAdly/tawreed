import { Schema } from "mongoose";

export default class DepartmentSchema extends Schema {

    public model = "Department";


    constructor({ id, options, schema =
        {
            departmentId: String,
            name: String,
            images: [String]
        }
    }: { id?: { enabled: boolean, key: string, value: any }, schema?: any, options?: any }
    ) {
        if (id?.enabled) schema[id.key] = id.value;
        super(schema, options);
    }
}