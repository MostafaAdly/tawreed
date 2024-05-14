"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CustomerType_1 = __importDefault(require("./Personas/CustomerType"));
const Utils_1 = __importDefault(require("../Utils"));
const ModelManager_1 = __importDefault(require("../Database/ModelManager"));
class Entity {
    constructor(input) {
        this._id = new mongoose_1.default.Types.ObjectId();
        this.entityId = Utils_1.default.entityId_prefix + Utils_1.default.createId();
        this.type = 1;
        this.personas = { customer: new CustomerType_1.default({ requests: [] }) };
        this.users = [];
        this.roles = [];
        this.departments = [];
        this.categories = [];
        this.load = (query) => __awaiter(this, void 0, void 0, function* () {
            const doc = yield ModelManager_1.default.loadOne(this.constructor.name, query);
            if (!doc)
                return;
            Object.assign(this, doc);
            return this;
        });
        this.save = () => __awaiter(this, void 0, void 0, function* () { return yield ModelManager_1.default.save(this.constructor.name, this); });
        if (input)
            Object.assign(this, input);
    }
    hasPermission(user, permission) {
        var _a;
        return !user || !user.role || !permission || !this.roles ? false : (_a = this.roles.find(role => role._id == user.role)) === null || _a === void 0 ? void 0 : _a.permissions.includes(permission);
    }
}
exports.default = Entity;
