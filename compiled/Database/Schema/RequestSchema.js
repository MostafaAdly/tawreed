"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ResponseType_1 = require("../../Instances/enums/ResponseType");
const RequestType_1 = require("../../Instances/enums/RequestType");
class RequestSchema extends mongoose_1.Schema {
    constructor({ id, options, schema = {
        requestId: String,
        product: { type: mongoose_1.default.Types.ObjectId, ref: 'Product' },
        responseType: { type: String, enum: Object.values(ResponseType_1.ResponseType) },
        requestType: { type: String, enum: Object.values(RequestType_1.RequestType) },
        rfqSettings: { quantity: Number, supplyTime: Number, paymentCondition: Number },
        supplier: { type: mongoose_1.default.Types.ObjectId, ref: 'Entity' },
        customer: { type: mongoose_1.default.Types.ObjectId, ref: 'Entity' },
        user: { type: mongoose_1.default.Types.ObjectId, ref: 'User' }
    } }) {
        if (id === null || id === void 0 ? void 0 : id.enabled)
            schema[id.key] = id.value;
        super(schema, options);
        this.model = "Request";
    }
}
exports.default = RequestSchema;
