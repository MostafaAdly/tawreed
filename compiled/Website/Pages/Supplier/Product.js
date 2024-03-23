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
const Page_1 = __importDefault(require("../Page"));
const Entity_1 = __importDefault(require("../../../Instances/Entity"));
const Product_1 = __importDefault(require("../../../Instances/Product"));
class Products extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || Products.base_url);
        this.data = data;
        this.run();
    }
    run() {
        // ALL SUPPLIERS OF A DEPARTMENT
        this.router.get('/suppliers/:supplierId/products', (req, res) => __awaiter(this, void 0, void 0, function* () {
            return res.status(200).redirect(`/suppliers/${req.params.supplierId}`);
        }));
        // PRODUCT BY ID OF SUPPLIER BY ID
        this.router.get('/suppliers/:supplierId/products/:productId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            const entity = yield Entity_1.default.schema().findOne({ id: req.params.supplierId });
            const product = yield Product_1.default.schema().findOne({ id: req.params.productId });
            console.log(req.params);
            console.log(req.params.supplierId, req.params.productId);
            console.log("--------------------------");
            console.log(entity);
            console.log("--------------------------");
            this.data.server.next.render(req, res, '/Customer/Supplier/ProductPage', { data: JSON.stringify({ user, supplier: entity, product }) });
        }));
    }
}
Products.base_url = "/";
exports.default = Products;
