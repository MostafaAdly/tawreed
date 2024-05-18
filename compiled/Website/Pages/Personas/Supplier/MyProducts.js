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
const Entity_1 = __importDefault(require("../../../../Instances/Entity"));
const Page_1 = __importDefault(require("../../Page"));
class MyProducts extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || MyProducts.base_url);
        this.getAllProducts = (categories) => {
            let products = [];
            for (let category of categories)
                products = products.concat(category.products);
            return products.filter((item, index) => products.indexOf(item) === index);
        };
        this.getEndCategories = (categories) => {
            let endCategories = [];
            let maxLength = 0;
            for (let category of categories) {
                const current = category.ancestry.split("/");
                if (current.length >= maxLength) {
                    if (current.length > maxLength)
                        endCategories = [];
                    maxLength = current.length;
                    endCategories.push({ name: category.name, _id: category._id });
                }
            }
            return endCategories;
        };
        this.data = data;
        this.run();
    }
    run() {
        // SUPPLIER - MY PRODUCTS PAGE
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            const entity = yield new Entity_1.default().load({ _id: user.entity });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL   
                return;
            }
            const categories = yield mongoose_1.default.models.EntityCategory.find({ entity: entity._id });
            const products = yield mongoose_1.default.models.Product.find({ _id: { $in: this.getAllProducts(categories) } });
            this.data.server.next.render(req, res, '/Supplier/MyProducts/SupplierProductsPage', { data: JSON.stringify({ user, entity, categories, products }) });
        }));
        // SUPPLIER - ADD PRODUCT
        this.router.get('/new', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            const entity = yield new Entity_1.default().load({ _id: user.entity });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL   
                return;
            }
            const categories = this.getEndCategories(yield mongoose_1.default.models.EntityCategory
                .find({ entity: entity }).select(["name", "ancestry"]).exec());
            this.data.server.next.render(req, res, '/Supplier/MyProducts/SupplierAddProductPage', { data: JSON.stringify({ user, entity, categories }) });
        }));
        // SUPPLIER - ADD CATEGORY
        this.router.get('/create-category', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            const entity = yield new Entity_1.default().load({ _id: user.entity });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL   
                return;
            }
            const ancestry = !req.query.ancestry ? "" : req.query.ancestry.replace('-', '/');
            this.data.server.next.render(req, res, '/Supplier/MyProducts/SupplierCreateCategoryPage', { data: JSON.stringify({ user, entity, ancestry }) });
        }));
    }
}
MyProducts.base_url = "/s/products";
exports.default = MyProducts;
