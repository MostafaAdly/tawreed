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
const Entity_1 = __importDefault(require("./Entity"));
const Permission_1 = require("./Permission");
const ModelManager_1 = __importDefault(require("../Database/ModelManager"));
const Utils_1 = __importDefault(require("../Utils"));
class User {
    constructor(input) {
        this._id = new mongoose_1.default.Types.ObjectId();
        this.userId = Utils_1.default.userId_prefix + Utils_1.default.createId();
        // === ADMIN INFO
        this.admin = false;
        this.setId = (id) => {
            this._id = id;
            return this;
        };
        this._load = (query) => __awaiter(this, void 0, void 0, function* () {
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
    load(withPassword = false, loadRole = true) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._load({ _id: this._id });
            if (loadRole)
                yield this.afterLoad(withPassword);
            // console.log(`Loaded User: ${user.userId}`, user);
        });
    }
    afterLoad(withPassword = false) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const roles = (_a = (yield new Entity_1.default().load({ _id: this.entity }))) === null || _a === void 0 ? void 0 : _a.roles;
            if (!roles)
                return this;
            this.role = roles.find((role) => role._id == this.role);
            if (!withPassword)
                delete this.credentials.password;
            return this;
        });
    }
    hasCustomerPermissions(entity) {
        var _a;
        const list = (_a = entity.roles.find(role => role._id == this.role)) === null || _a === void 0 ? void 0 : _a.permissions;
        return this.role != null && list != null && list.includes(Permission_1.Permission.CUSTOMER_ALL);
    }
    hasSupplierPermissions(entity) {
        var _a;
        const list = (_a = entity.roles.find(role => role._id == this.role)) === null || _a === void 0 ? void 0 : _a.permissions;
        return this.role != null && list != null && list.includes(Permission_1.Permission.SUPPLIER_ALL);
    }
}
exports.default = User;
