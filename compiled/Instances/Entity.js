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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const User_1 = __importDefault(require("./User"));
const Utils_1 = __importDefault(require("../Utils"));
class Entity {
    constructor(input) {
        this.id = Utils_1.default.entityId_prefix + Utils_1.default.createId();
        this.users = [];
        this.roles = [];
        this.categories = [];
        this.load = (id) => __awaiter(this, void 0, void 0, function* () {
            this.id = id;
            if (!this.id)
                return this;
            const entity = yield _a.schema().findOne({ id: this.id });
            if (!entity)
                return this;
            this.details = entity.details;
            this.personas = entity.personas;
            this.roles = entity.roles;
            this.categories = entity.categories;
            yield this.afterLoad();
            return this;
        });
        this.save = () => __awaiter(this, void 0, void 0, function* () { return yield new (_a.schema())(this).save(); });
        this.details = input.details;
        this.personas = input.personas;
        this.roles = input.roles;
    }
    afterLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            this.users = yield this.getUsers();
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            var loadedUsers = yield User_1.default.schema().find({ entity: this.id });
            var users = [];
            for (var user of loadedUsers)
                users.push(yield new User_1.default(user.id, user.displayName, user.credentials, user.entity, user.role).afterLoad(false));
            return users;
        });
    }
    hasPermission(user, permission) {
        var _b;
        return !user || !user.role || !permission || !this.roles ? false : (_b = this.roles.find(role => role.id == user.role)) === null || _b === void 0 ? void 0 : _b.permissions.includes(permission);
    }
}
_a = Entity;
Entity.schema = () => {
    if (!_a.model)
        _a.model = mongoose_1.default.model('entities', new mongoose_1.Schema({
            id: { type: String, unique: true },
            details: { type: Object },
            personas: { type: Object },
            roles: { type: (Array) },
            categories: { type: (Array) }
        }));
    return _a.model;
};
exports.default = Entity;
