"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Persona_1 = __importDefault(require("./Persona"));
class CustomerType extends Persona_1.default {
    constructor(input) {
        super();
        this.requests = [];
        if (input)
            Object.assign(this, input);
    }
}
exports.default = CustomerType;
