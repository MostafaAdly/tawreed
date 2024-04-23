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
const ar_1 = require("@faker-js/faker/locale/ar");
const Utils_1 = __importDefault(require("../Utils"));
const ModelManager_1 = __importDefault(require("../Database/ModelManager"));
class EntityCategory {
    constructor(input) {
        this._id = new mongoose_1.default.Types.ObjectId();
        this.categoryId = Utils_1.default.entityCategoryId_prefix + Utils_1.default.createId();
        this.products = [];
        this.ancestry = "";
        this.random = (list) => list[Math.floor(Math.random() * list.length)];
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
    setId(id) {
        this._id = id;
        return this;
    }
    setProducts(products) {
        this.products = products;
        return this;
    }
    createFakerChildren(products, entity, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (amount == 0) {
                // create products
                var asd = Math.floor(Math.random() * (((_a = entity.personas.supplier) === null || _a === void 0 ? void 0 : _a.products.length) || 0));
                console.log(`adding ${asd} products to ${this._id}`);
                for (let i = 0; i < asd; i++)
                    this.products.push(this.random(products)._id);
            }
            else {
                for (let i = 0; i < Math.floor(Math.random() * 4) + 1; i++) {
                    const category = new EntityCategory({
                        name: `Group ${ar_1.faker.word.sample()}`,
                        description: ar_1.faker.company.catchPhrase(),
                        entity: entity._id,
                        ancestry: this.ancestry + "/" + this.categoryId
                    });
                    category.createFakerChildren(products, entity, amount - 1);
                    // this.children.push(category);
                }
            }
            yield this.save();
        });
    }
}
exports.default = EntityCategory;
