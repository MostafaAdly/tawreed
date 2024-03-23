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
const Price_1 = __importDefault(require("./Price"));
class Product {
    constructor(input) {
        this.id = Utils_1.default.productId_prefix + Utils_1.default.createId();
        this.details = {};
        this.images = [];
        this.save = () => __awaiter(this, void 0, void 0, function* () { return yield new (_a.schema())(this).save(); });
        this.id = input.id || this.id;
        this.name = input.name;
        this.description = input.description;
        this.details = input.details;
        this.price = input.price || new Price_1.default({ cost: 0, quantity: 1, unit: "قطعة" });
        this.images = input.images || [];
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id)
                return;
            const product = yield _a.schema().find({ id: this.id });
            if (!product)
                return;
            this.name = product.description;
            this.description = product.description;
            this.details = product.details;
            console.log(`Loaded Product: ${product.id}}`, product);
        });
    }
}
_a = Product;
Product.schema = () => {
    if (!_a.model)
        _a.model = mongoose_1.default.model('products', new mongoose_1.Schema({
            id: { type: String, unique: true },
            name: String,
            description: String,
            details: Object,
            price: Object,
            images: (Array),
        }));
    return _a.model;
};
exports.default = Product;
