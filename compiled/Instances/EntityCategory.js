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
const ar_1 = require("@faker-js/faker/locale/ar");
const Utils_1 = __importDefault(require("../Utils"));
class EntityCategory {
    constructor(input) {
        this.id = Utils_1.default.entityCategoryId_prefix + Utils_1.default.createId();
        this.products = [];
        this.ancestry = "";
        this.load = () => __awaiter(this, void 0, void 0, function* () {
            const category = yield _a.schema().findOne({ id: this.id });
            if (!category)
                return this;
            this.name = category.name;
            this.description = category.description;
            this.entity = category.entity;
            this.ancestry = category.ancestry;
            this.products = category.products;
        });
        this.random = (list) => list[Math.floor(Math.random() * list.length)];
        this.save = () => __awaiter(this, void 0, void 0, function* () { return yield new (_a.schema())(this).save(); });
        if (typeof input === "string")
            this.id = input;
        else {
            this.name = input.name;
            this.description = input.description;
            this.entity = input.entity;
            this.ancestry = input.ancestry || this.ancestry;
        }
    }
    setId(id) {
        this.id = id;
        return this;
    }
    setProducts(products) {
        this.products = products;
        return this;
    }
    createFakerChildren(products, entity, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (amount == 0) {
                // create products
                var asd = Math.floor(Math.random() * entity.personas.supplier.products.length);
                console.log(`adding ${asd} products to ${this.id}`);
                for (let i = 0; i < asd; i++)
                    this.products.push(this.random(products).id);
            }
            else {
                for (let i = 0; i < Math.floor(Math.random() * 4) + 1; i++) {
                    const category = new _a({
                        name: `Group ${ar_1.faker.word.sample()}`,
                        description: ar_1.faker.company.catchPhrase(),
                        entity: entity.id,
                        ancestry: this.ancestry + "/" + this.id
                    });
                    category.createFakerChildren(products, entity, amount - 1);
                    // this.children.push(category);
                }
            }
            yield this.save();
        });
    }
}
_a = EntityCategory;
EntityCategory.schema = () => {
    if (!_a.model)
        _a.model = mongoose_1.default.model('categories', new mongoose_1.Schema({
            id: { type: String, unique: true },
            name: { type: String },
            description: { type: String },
            entity: { type: String },
            // children: { type: Array<Object> },
            ancestry: { type: String },
            products: { type: (Array) }
        }));
    return _a.model;
};
exports.default = EntityCategory;
