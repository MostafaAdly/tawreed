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
const Entity_1 = __importDefault(require("../../../../Instances/Entity"));
const EntityCategory_1 = __importDefault(require("../../../../Instances/EntityCategory"));
const Product_1 = __importDefault(require("../../../../Instances/Product"));
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
        this.data = data;
        this.run();
    }
    run() {
        // SUPPLIER - MY PRODUCTS PAGE
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            const entity = yield new Entity_1.default({}).load(user.entity);
            const categories = yield EntityCategory_1.default.schema().find({ entity: entity.id });
            const products = yield Product_1.default.schema().find({ id: { "$in": this.getAllProducts(categories) } });
            this.data.server.next.render(req, res, '/Supplier/MyProducts/SupplierProductsPage', { data: JSON.stringify({ user, entity, categories, products }) });
        }));
    }
}
MyProducts.base_url = "/s/products";
exports.default = MyProducts;
