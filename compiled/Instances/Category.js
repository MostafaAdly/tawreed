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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const uuid_1 = require("uuid");
class Category {
    constructor(input) {
        this.id = (0, uuid_1.v4)();
        this.products = [];
        this.children = [];
        this.load = () => __awaiter(this, void 0, void 0, function* () {
            const category = yield _a.schema().findOne({ id: this.id });
            if (!category)
                return this;
            this.name = category.name;
            this.description = category.description;
            this.parent = category.parent;
            this.products = category.products;
            this.children = category.children;
        });
        this.save = () => __awaiter(this, void 0, void 0, function* () { return yield new (_a.schema())(this).save(); });
        if (typeof input === "string")
            this.id = input;
        else {
            this.id = input.id;
            this.name = input.name;
            this.description = input.description;
            this.parent = input.parent;
            this.products = input.products;
            this.children = input.children;
        }
    }
}
_a = Category;
Category.schema = () => {
    if (!_a.model)
        _a.model = mongoose_1.default.model('categories', new mongoose_1.Schema({
            id: { type: String, unique: true },
            name: { type: String },
            description: { type: String },
            parent: { type: _a },
            products: { type: (Array) },
            children: { type: (Array) }
        }));
    return _a.model;
};
exports.default = Category;
