import mongoose, { Schema } from "mongoose";
import { ResponseType } from "../../Instances/ResponseType";
import { RequestType } from "../../Instances/RequestType";

export default class RequestSchema extends Schema {

    public model = "Request";

    constructor({ id, options, schema =
        {
            requestId: String,
            product: { type: mongoose.Types.ObjectId, ref: 'Product' },
            responseType: { type: String, enum: Object.values(ResponseType) },
            requestType: { type: String, enum: Object.values(RequestType) },
            entity: { type: mongoose.Types.ObjectId, ref: 'Entity' },
            user: { type: mongoose.Types.ObjectId, ref: 'User' }
        }
    }: { id?: { enabled: boolean, key: string, value: any }, schema?: any, options?: any }
    ) {
        if (id?.enabled) schema[id.key] = id.value;
        super(schema, options);
    }
}