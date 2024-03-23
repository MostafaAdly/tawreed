"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = __importDefault(require("../../Utils"));
class EntityRole {
    constructor(input) {
        this.id = Utils_1.default.roleId_prefix + Utils_1.default.createId();
        this.id = input.id || this.id;
        this.name = input.name;
        this.permissions = input.permissions || [];
    }
}
exports.default = EntityRole;
