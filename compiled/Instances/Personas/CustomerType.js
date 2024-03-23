"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Persona_1 = __importDefault(require("./Persona"));
class CustomerType extends Persona_1.default {
    constructor(users) {
        super();
        this.users = [];
        this.users = users;
    }
}
exports.default = CustomerType;
