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
const Product_1 = __importDefault(require("../../../../../Instances/Product"));
const Page_1 = __importDefault(require("../../../Page"));
const Entity_1 = __importDefault(require("../../../../../Instances/Entity"));
const mongoose_1 = __importDefault(require("mongoose"));
class Supplier extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || Supplier.base_url);
        this.data = data;
        this.run();
    }
    run() {
        // ALL SUPPLIERS OF A DEPARTMENT
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            return res.status(200).redirect('/home#departments');
        }));
        // SUPPLIER BY ID
        this.router.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = req.session.user;
            const entity = yield new Entity_1.default().load({ entityId: req.params.id });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL
                return;
            }
            const products = yield mongoose_1.default.models.Product.find({ _id: { $in: ((_a = entity.personas.supplier) === null || _a === void 0 ? void 0 : _a.products) || [] } });
            this.data.server.next.render(req, res, '/Customer/Supplier/SupplierPage', { data: JSON.stringify({ user, supplier: entity, products }) });
        }));
        // ALL PRODUCTS OF A SUPPLIERS OF A DEPARTMENT
        this.router.get('/:supplierId/products', (req, res) => __awaiter(this, void 0, void 0, function* () {
            return res.status(200).redirect(`/c/suppliers/${req.params.supplierId}`);
        }));
        // PRODUCT BY ID OF SUPPLIER BY ID
        this.router.get('/:supplierId/products/:productId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            const entity = yield new Entity_1.default().load({ entityId: req.params.supplierId });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL
                return;
            }
            const product = yield new Product_1.default().load({ productId: req.params.productId });
            if (!product) {
                // TODO: HANDLE PRODUCT IF NULL
                return;
            }
            const comments = yield mongoose_1.default.models.Comment
                .find({ product: product._id })
                .populate({
                path: 'user', select: ["displayName", "image"],
                populate: [{ path: 'role', select: "name" }, { path: "entity", select: "details.displayName" }]
            }).exec();
            user.entity = yield new Entity_1.default().load({ _id: user.entity });
            this.data.server.next.render(req, res, '/Customer/Supplier/ProductPage', { data: JSON.stringify({ user, supplier: entity, product, comments }) });
        }));
        // RFQ FOR PRODUCT BY ID OF SUPPLIER BY ID
        this.router.get('/:supplierId/products/:productId/rfq', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            const entity = yield new Entity_1.default().load({ entityId: req.params.supplierId });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL
                return;
            }
            const product = yield new Product_1.default().load({ productId: req.params.productId });
            if (!product) {
                // TODO: HANDLE PRODUCT IF NULL
                return;
            }
            this.data.server.next.render(req, res, '/Customer/Supplier/RequestForQuotation', { data: JSON.stringify({ user, supplier: entity, product }) });
        }));
        // RFQ REQUESTED FOR PRODUCT BY ID FOR A SUPPLIER BY ID
        this.router.get('/:supplierId/products/:productId/rfq/sent', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            const entity = yield new Entity_1.default().load({ entityId: req.params.supplierId });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL
                return;
            }
            const product = yield new Product_1.default().load({ productId: req.params.productId });
            if (!product) {
                // TODO: HANDLE PRODUCT IF NULL
                return;
            }
            this.data.server.next.render(req, res, '/Customer/Supplier/RFQ_Requested', { data: JSON.stringify({ user, supplier: entity, product }) });
        }));
    }
}
Supplier.base_url = "/c/suppliers";
exports.default = Supplier;
