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
const Page_1 = __importDefault(require("../../../Page"));
const Entity_1 = __importDefault(require("../../../../../Instances/Entity"));
const mongoose_1 = __importDefault(require("mongoose"));
class CustomerRequests extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || CustomerRequests.base_url);
        this.data = data;
        this.run();
    }
    run() {
        // ALL SUPPLIERS OF A DEPARTMENT
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = req.session.user;
            const entity = yield new Entity_1.default().load({ entityId: req.params.id });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL
                return;
            }
            const products = yield mongoose_1.default.models.Product.find({ _id: { $in: ((_a = entity.personas.supplier) === null || _a === void 0 ? void 0 : _a.products) || [] } });
            this.data.server.next.render(req, res, '/Customer/Profile/CustomerRequests', { data: JSON.stringify({ user, supplier: entity, products }) });
        }));
    }
}
CustomerRequests.base_url = "/c/requests";
exports.default = CustomerRequests;
