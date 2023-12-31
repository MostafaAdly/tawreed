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
const uuid_1 = require("uuid");
const ImageURL_1 = __importDefault(require("./ImageURL"));
class User {
    constructor(user) {
        var _b, _c;
        this.id = (0, uuid_1.v4)();
        this.id = user.id || (0, uuid_1.v4)();
        this.arabicName = user.arabicName;
        this.englishName = user.englishName;
        this.credentials = { email: user.email, password: user.password };
        this.createdAt = user.createdAt || new Date();
        //===
        if (this.credentials)
            this.credentials.email = (_c = (_b = this.credentials) === null || _b === void 0 ? void 0 : _b.email) === null || _c === void 0 ? void 0 : _c.toLowerCase();
        //===
        this.imageURL = new ImageURL_1.default(user.imageURL).getURL();
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new (_a.schema())(this).save();
        });
    }
}
_a = User;
User.schema = () => {
    if (!_a.model)
        _a.model = mongoose_1.default.model('users', new mongoose_1.Schema({
            id: { type: String, unique: true },
            arabicName: String,
            englishName: String,
            imageURL: String,
            credentials: Object,
            createdAt: Date
        }));
    return _a.model;
};
exports.default = User;
