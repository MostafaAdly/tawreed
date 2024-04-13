import mongoose, { Schema } from "mongoose";
import { ResponseType } from "../../Instances/ResponseType";
import { RequestType } from "../../Instances/RequestType";
import RFQSettings from "../../Instances/RFQSettings";
import { PaymentMethod } from "../../Instances/PaymentMethod";

export default class RequestSchema extends Schema {

    public model = "Payment";

    constructor({ id, options, schema =
        {
            paymentId: String,
            commission: Number,
            request: { type: mongoose.Types.ObjectId, ref: 'Request' },
            customer: { type: mongoose.Types.ObjectId, ref: 'Entity' },
            supplier: { type: mongoose.Types.ObjectId, ref: 'Entity' },
            paymentMethod: { type: String, enum: Object.values(PaymentMethod) },
        }
    }: { id?: { enabled: boolean, key: string, value: any }, schema?: any, options?: any }
    ) {
        if (id?.enabled) schema[id.key] = id.value;
        super(schema, options);
    }
}