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
class EntitySchema extends mongoose_1.Schema {
    constructor({ id, options, schema = {
        entityId: String,
        details: {
            displayName: String,
            logo: String,
            banner: String,
            description: String,
        },
        personas: {
            supplier: {
                products: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Product' }],
            }, customer: {
                requests: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Request' }]
            }
        },
        departments: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Department' }],
        roles: [{ type: mongoose_1.default.Types.ObjectId, ref: 'EntityRole' }],
        categories: [{ type: mongoose_1.default.Types.ObjectId, ref: 'EntityCategory' }],
    } }) {
        if (id === null || id === void 0 ? void 0 : id.enabled)
            schema[id.key] = id.value;
        super(schema, options);
        this.model = "Entity";
    }
}
exports.default = EntitySchema;
