import mongoose, { Schema } from "mongoose";
import { ResponseType } from "../../Instances/enums/ResponseType";
import { RequestType } from "../../Instances/enums/RequestType";
import RFQSettings from "../../Instances/RFQSettings";

export default class RequestSchema extends Schema {

    public model = "Request";

    constructor({ id, options, schema =
        {
            requestId: String,
            product: { type: mongoose.Types.ObjectId, ref: 'Product' },
            responseType: { type: String, enum: Object.values(ResponseType) },
            requestType: { type: String, enum: Object.values(RequestType) },
            rfqSettings: { quantity: Number, supplyTime: Number, paymentCondition: Number },
            supplier: { type: mongoose.Types.ObjectId, ref: 'Entity' },
            customer: { type: mongoose.Types.ObjectId, ref: 'Entity' },
            user: { type: mongoose.Types.ObjectId, ref: 'User' }
        }
    }: { id?: { enabled: boolean, key: string, value: any }, schema?: any, options?: any }
    ) {
        if (id?.enabled) schema[id.key] = id.value;
        super(schema, options);
    }
}