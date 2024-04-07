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
const Page_1 = __importDefault(require("../../Page"));
class MyRequests extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || MyRequests.base_url);
        this.data = data;
        this.run();
    }
    run() {
        // SUPPLIER - MY REQUESTS PAGE
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            const entity = yield new Entity_1.default({}).load(user.entity);
            this.data.server.next.render(req, res, '/Supplier/MyRequests/SupplierRequestsPage', { data: JSON.stringify({ user, entity }) });
        }));
    }
}
MyRequests.base_url = "/s/orders";
exports.default = MyRequests;
