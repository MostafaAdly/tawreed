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
const Utils_1 = __importDefault(require("../Utils"));
const Entity_1 = __importDefault(require("./Entity"));
const Permission_1 = require("./Personas/Permission");
class User {
    constructor(...args) {
        this.id = Utils_1.default.userId_prefix + Utils_1.default.createId();
        this.setId = (id) => {
            this.id = id;
            return this;
        };
        this.save = () => __awaiter(this, void 0, void 0, function* () { return yield new (_a.schema())(this).save(); });
        if (args.length == 1) {
            this.id = args[0];
        }
        else if (args.length == 4) {
            this.displayName = args[0];
            this.credentials = args[1];
            this.entity = args[2];
            this.role = args[3];
        }
    }
    load(withPassword = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id)
                return;
            const user = yield _a.schema().find({ id: this.id });
            if (!user)
                return;
            this.displayName = user.displayName;
            this.credentials = user.credentials;
            yield this.afterLoad(withPassword);
            console.log(`Loaded User: ${user.id}}`, user);
        });
    }
    afterLoad(withPassword = false) {
        var _b;
        return __awaiter(this, void 0, void 0, function* () {
            const roles = (_b = (yield Entity_1.default.schema().findOne({ id: this.entity }))) === null || _b === void 0 ? void 0 : _b.roles;
            this.role = roles.find((role) => role.id == this.role);
            if (!withPassword)
                this.credentials = { username: this.credentials.username };
            return this;
        });
    }
    hasCustomerPermissions(entity) {
        var _b;
        const list = (_b = entity.roles.find(role => role.id == this.role)) === null || _b === void 0 ? void 0 : _b.permissions;
        return this.role != null && list != null && list.includes(Permission_1.Permission.CUSTOMER_ALL);
    }
    hasSupplierPermissions(entity) {
        var _b;
        const list = (_b = entity.roles.find(role => role.id == this.role)) === null || _b === void 0 ? void 0 : _b.permissions;
        return this.role != null && list != null && list.includes(Permission_1.Permission.SUPPLIER_ALL);
    }
}
_a = User;
User.schema = () => {
    if (!_a.model)
        _a.model = mongoose_1.default.model('users', new mongoose_1.Schema({
            id: { type: String, unique: true },
            displayName: String,
            credentials: Object,
            entity: String,
            role: String,
        }));
    return _a.model;
};
exports.default = User;
