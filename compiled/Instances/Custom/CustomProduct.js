"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../Product"));
const Utils_1 = __importDefault(require("../../Utils"));
class CustomProduct extends Product_1.default {
    constructor(input) {
        super({ id: input.id });
        this.id = Utils_1.default.createId();
        this.details = {};
        this.images = [];
        this.id = input.id;
        this.name = input.name;
        this.description = input.description;
        this.details = input.details;
        this.images = input.images;
    }
}
exports.default = CustomProduct;
