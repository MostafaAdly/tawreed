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
const Utils_1 = __importDefault(require("../Utils"));
const ModelManager_1 = __importDefault(require("../Database/ModelManager"));
class EntityRole {
    constructor(input) {
        this._id = new mongoose_1.default.Types.ObjectId();
        this.roleId = Utils_1.default.roleId_prefix + Utils_1.default.createId();
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
}
exports.default = EntityRole;
