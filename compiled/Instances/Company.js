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
const uuid_1 = require("uuid");
class Company {
    constructor(company) {
        this.id = (0, uuid_1.v4)();
        this.schema = () => {
            if (!this.model)
                this.model = mongoose_1.default.model('companies', new mongoose_1.Schema({
                    id: { type: String, unique: true },
                    name: String,
                    field: String,
                    description: String,
                    products: Array,
                    departments: Array,
                    addedAt: Date
                }));
            return this.model;
        };
        this.id = company.id || (0, uuid_1.v4)();
        this.name = company.name;
        this.field = company.field;
        this.description = company.description;
        this.products = company.products;
        this.departments = company.departments;
        this.addedAt = company.addedAt || new Date();
    }
}
exports.default = Company;
