"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = __importDefault(require("../../Utils"));
class Persona {
    constructor() {
        this.id = Utils_1.default.personaId_prefix + Utils_1.default.createId();
    }
}
exports.default = Persona;
